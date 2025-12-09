import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { CategoriesModule } from './categories/categorie.module';
import { ClientsModule } from './clients/clients.module';
import { TechniciansModule } from './technicians/technicians.module';
import { User } from './users/entities/user.entity';
import { Category } from './categories/entities/categories.entity';
import { Client } from './clients/entities/client.entity';
import { Technician } from './technicians/entities/technicians.entity';
import { Ticket } from './tickets/entities/ticket.entity';


@Module({
imports: [
ConfigModule.forRoot({ isGlobal: true }),
TypeOrmModule.forRootAsync({
imports: [ConfigModule],
inject: [ConfigService],
useFactory: (config: ConfigService) => ({
type: 'postgres',
host: config.get('DATABASE_HOST', 'localhost'),
port: +config.get('DATABASE_PORT', 5432),
username: config.get('DATABASE_USER', 'postgres'),
password: config.get('DATABASE_PASSWORD', 'postgres'),
database: config.get('DATABASE_NAME', 'techhelpdesk'),
entities: [User, Category, Client, Technician, Ticket],
synchronize: true,
logging: false,
}),
}),
UsersModule,
AuthModule,
TicketsModule,
CategoriesModule,
ClientsModule,
TechniciansModule,
],
})
export class AppModule {}