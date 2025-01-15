import { Role } from 'src/config/roles';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Table,
} from 'typeorm';

export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', length: 50 })
  name: string;
  @Column({ type: 'varchar', length: 50 })
  familya: string;
  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;
  @Column({ type: 'varchar', length: 50, unique: true })
  password: string;
  @Column({ type: 'varchar', length: 25, unique: true })
  phone_number: string;
  @Column({ type: 'enum', enum: Role, default: Role.user })
  role: Role;
  @Column({ type: 'boolean', default: false })
  isactive: boolean;
}
