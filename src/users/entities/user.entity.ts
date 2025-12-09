import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  TECHNICIAN = 'TECHNICIAN',
  CLIENT = 'CLIENT',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // <-- NECESARIO

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT, // <-- DEFAULT correcto
  })
  role: UserRole;
}
