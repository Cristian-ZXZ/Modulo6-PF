import { IsString, IsEmail, MinLength, IsIn, IsOptional } from 'class-validator';


export class CreateUserDto {
@IsString() name: string;


@IsEmail() email: string;


@IsString() @MinLength(6) password: string;


@IsOptional()
@IsIn(['ADMIN', 'TECHNICIAN', 'CLIENT'])
role?: string;
}