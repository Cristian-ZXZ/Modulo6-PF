import { IsUUID, IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';


export class CreateTicketDto {
@IsString() @IsNotEmpty()
title: string;


@IsString() @IsNotEmpty()
description: string;


@IsUUID()
categoryId: string;


@IsUUID()
clientId: string;


@IsInt()
@Min(1)
@Max(5)
priority?: number;
}
