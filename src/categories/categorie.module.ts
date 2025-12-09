import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categorie.service';
import { CategoriesController } from './categorie.controller';
import { Category } from './entities/categories.entity';


@Module({
imports: [TypeOrmModule.forFeature([Category])],
controllers: [CategoriesController],
providers: [CategoriesService],
exports: [CategoriesService],
})
export class CategoriesModule {}