import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { TechniciansService } from './technicians.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';


@Controller('technicians')
export class TechniciansController {
constructor(private svc: TechniciansService) {}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Post()
create(@Body() dto: any) {
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