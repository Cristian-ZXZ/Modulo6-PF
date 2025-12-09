import { 
  Controller, Post, Body, Get, Param, Patch, Delete, UseGuards 
} from "@nestjs/common";
import { UsersService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import * as bcrypt from "bcrypt";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Crear usuario normal
   */
  @Post()
  async create(@Body() dto: CreateUserDto) {
    // Se hashea la contraseña ANTES de guardar
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.usersService.create({ ...dto, password: hashed });
  }

  /**
   * Seed Admin — SOLO PARA PRUEBA INICIAL (borralo después)
   */
  @Post('seed-admin')
  async seedAdmin() {
    const hashed = await bcrypt.hash("123456", 10);

    return this.usersService.create({
      name: "Admin",
      email: "admin@example.com",
      password: hashed,
      role: "ADMIN",
    });
  }

  /**
   * Obtener todos los usuarios (solo admin)
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Obtener un usuario por ID (solo admin)
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Actualizar usuario (solo admin)
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    let payload = { ...dto };

    if (dto.password) {
      payload.password = await bcrypt.hash(dto.password, 10);
    }

    return this.usersService.update(id, payload);
  }

  /**
   * Eliminar usuario (solo admin)
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
