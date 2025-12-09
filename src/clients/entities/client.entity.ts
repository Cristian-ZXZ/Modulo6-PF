import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('clients')
export class Client {
@PrimaryGeneratedColumn('uuid')
id: string;


@Column()
name: string;


@Column({ nullable: true })
company: string;


@Column()
contactEmail: string;
}