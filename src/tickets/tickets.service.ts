import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, TicketStatus } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CategoriesService } from '../categories/categorie.service';
import { ClientsService } from '../clients/clients.service';
import { TechniciansService } from '../technicians/technicians.service';

const transitions: Record<TicketStatus, TicketStatus[]> = {
  [TicketStatus.OPEN]: [TicketStatus.IN_PROGRESS],
  [TicketStatus.IN_PROGRESS]: [TicketStatus.RESOLVED],
  [TicketStatus.RESOLVED]: [TicketStatus.CLOSED],
  [TicketStatus.CLOSED]: [],
};

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private repo: Repository<Ticket>,
    private categoriesService: CategoriesService,
    private clientsService: ClientsService,
    private techniciansService: TechniciansService,
  ) {}

  async create(dto: CreateTicketDto) {
    const category = await this.categoriesService.findOne(dto.categoryId);
    const client = await this.clientsService.findOne(dto.clientId);

    if (!category) throw new NotFoundException('Category not found');
    if (!client) throw new NotFoundException('Client not found');

    const ticket = this.repo.create({
      title: dto.title,
      description: dto.description,
      priority: dto.priority || 3,
      category,
      client,
      status: TicketStatus.OPEN,
    });

    return this.repo.save(ticket);
  }

  findAll() {
    return this.repo.find({ relations: ['client', 'category', 'technician'] });
  }

  async findOne(id: string) {
    const t = await this.repo.findOne({
      where: { id },
      relations: ['client', 'category', 'technician'],
    });

    if (!t) throw new NotFoundException('Ticket not found');
    return t;
  }

  async findByClient(clientId: string) {
    return this.repo.find({
      where: { client: { id: clientId } },
      relations: ['client', 'category', 'technician'],
    });
  }

  async findByTechnician(techId: string) {
    return this.repo.find({
      where: { technician: { id: techId } },
      relations: ['client', 'category', 'technician'],
    });
  }

  async updateStatus(id: string, dto: UpdateStatusDto, assignedTechnicianId?: string) {
    const ticket = await this.findOne(id);
    const current = ticket.status;
    const next = dto.status as TicketStatus;

    if (current === next) return ticket;

    const allowed = transitions[current];
    if (!allowed.includes(next)) {
      throw new BadRequestException(`Invalid status transition: ${current} -> ${next}`);
    }

    // Si el ticket pasa a IN_PROGRESS → validar técnico
    if (next === TicketStatus.IN_PROGRESS) {
      const techId = assignedTechnicianId || ticket.technician?.id;

      if (!techId) {
        throw new BadRequestException('Assign a technician before setting to IN_PROGRESS');
      }

      const tech = await this.techniciansService.findOne(techId);
      if (!tech) {
        throw new NotFoundException('Technician not found');
      }

      const count = await this.repo.count({
        where: { technician: { id: techId }, status: TicketStatus.IN_PROGRESS },
      });

      if (count >= 5) {
        throw new BadRequestException('Technician already has 5 tickets in progress');
      }

      ticket.technician = tech;
    }

    ticket.status = next;
    ticket.updatedAt = new Date();

    return this.repo.save(ticket);
  }
}
