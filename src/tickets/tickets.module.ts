import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { CategoriesModule } from '../categories/categorie.module';
import { ClientsModule } from '../clients/clients.module';
import { TechniciansModule } from '../technicians/technicians.module';


@Module({
imports: [TypeOrmModule.forFeature([Ticket]), CategoriesModule, ClientsModule, TechniciansModule],
controllers: [TicketsController],
providers: [TicketsService],
})
export class TicketsModule {}