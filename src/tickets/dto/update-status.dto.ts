import { IsString, IsIn } from 'class-validator';


export class UpdateStatusDto {
@IsString()
@IsIn(['OPEN','IN_PROGRESS','RESOLVED','CLOSED'])
status: 'OPEN'|'IN_PROGRESS'|'RESOLVED'|'CLOSED';
}