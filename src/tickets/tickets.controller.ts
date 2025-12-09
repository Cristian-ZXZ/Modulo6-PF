import { Controller, Post, Body, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';


@Controller('tickets')
export class TicketsController {
constructor(private svc: TicketsService) {}


@UseGuards(JwtAuthGuard)
@Post()
create(@Body() dto: CreateTicketDto, @CurrentUser() user: any) {
// if client role, enforce clientId = user's id mapped to client entity in real model
return this.svc.create(dto);
}


@UseGuards(JwtAuthGuard)
@Get()
findAll() {
return this.svc.findAll();
}


@UseGuards(JwtAuthGuard)
@Get(':id')
findOne(@Param('id') id: string) {
return this.svc.findOne(id);
}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('TECHNICIAN', 'ADMIN')
@Patch(':id/status')
updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
return this.svc.updateStatus(id, dto);
}


@UseGuards(JwtAuthGuard)
@Get('client/:id')
findByClient(@Param('id') id: string) {
return this.svc.findByClient(id);
}


@UseGuards(JwtAuthGuard)
@Get('technician/:id')
findByTechnician(@Param('id') id: string) {
return this.svc.findByTechnician(id);
}
}