import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  DataSource,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 25 })
  model: string;

  @Column({ type: 'int' })
  memory: number;

  @Column({ type: 'int' })
  ram: number;

  @Column({ type: 'varchar', length: 60 })
  year: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  user: User;
  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];
}
