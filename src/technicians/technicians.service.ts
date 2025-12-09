import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technician } from './entities/technicians.entity';


@Injectable()
export class TechniciansService {
constructor(@InjectRepository(Technician) private repo: Repository<Technician>) {}


create(dto: Partial<Technician>) {
return this.repo.save(this.repo.create(dto));
}


findAll() {
return this.repo.find();
}


async findOne(id: string) {
const t = await this.repo.findOne({ where: { id } });
if (!t) throw new NotFoundException('Technician not found');
return t;
}


async update(id: string, dto: Partial<Technician>) {
await this.findOne(id);
await this.repo.update(id, dto);
return this.findOne(id);
}


async remove(id: string) {
await this.findOne(id);
return this.repo.delete(id);
}
}   