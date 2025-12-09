import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';


@Injectable()
export class ClientsService {
constructor(@InjectRepository(Client) private repo: Repository<Client>) {}


create(dto: Partial<Client>) {
return this.repo.save(this.repo.create(dto));
}


findAll() {
return this.repo.find();
}


async findOne(id: string) {
const c = await this.repo.findOne({ where: { id } });
if (!c) throw new NotFoundException('Client not found');
return c;
}


async update(id: string, dto: Partial<Client>) {
await this.findOne(id);
await this.repo.update(id, dto);
return this.findOne(id);
}


async remove(id: string) {
await this.findOne(id);
return this.repo.delete(id);
}
}