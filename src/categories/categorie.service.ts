import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/categories.entity';

@Injectable()
export class CategoriesService {
constructor(@InjectRepository(Category) private repo: Repository<Category>) {}


create(dto: Partial<Category>) {
return this.repo.save(this.repo.create(dto));
}


findAll() {
return this.repo.find();
}


async findOne(id: string) {
const c = await this.repo.findOne({ where: { id } });
if (!c) throw new NotFoundException('Category not found');
return c;
}


async update(id: string, dto: Partial<Category>) {
await this.findOne(id);
await this.repo.update(id, dto);
return this.findOne(id);
}


async remove(id: string) {
await this.findOne(id);
return this.repo.delete(id);
}
}