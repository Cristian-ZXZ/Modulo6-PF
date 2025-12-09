import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('technicians')
export class Technician {
@PrimaryGeneratedColumn('uuid')
id: string;


@Column()
name: string;


@Column()
specialty: string;


@Column({ default: true })
availability: boolean;
}