import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/categories.entity';
import { Client } from '../../clients/entities/client.entity';
import { Technician } from '../../technicians/entities/technicians.entity';

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  @Column({ type: 'int', default: 3 })
  priority: number;

  @ManyToOne(() => Category, { nullable: false, eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => Client, { nullable: false, eager: true })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @ManyToOne(() => Technician, { nullable: true, eager: true })
  @JoinColumn({ name: 'technicianId' })
  technician?: Technician;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
