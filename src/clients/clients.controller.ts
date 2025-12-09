import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';


@Controller('clients')
export class ClientsController {
constructor(private svc: ClientsService) {}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Post()
create(@Body() dto: any) {
return this.svc.create(dto);
}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Get()
findAll() {
return this.svc.findAll();
}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Get(':id')
findOne(@Param('id') id: string) {
return this.svc.findOne(id);
}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Patch(':id')
update(@Param('id') id: string, @Body() dto: any) {
return this.svc.update(id, dto);
}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Delete(':id')
remove(@Param('id') id: string) {
return this.svc.remove(id);
}
}