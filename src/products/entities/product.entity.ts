import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 5, nullable: true })
  model: string;

  @Column({ type: 'int', nullable: true })
  memory: number;

  @Column({ type: 'int', nullable: true })
  ram: number;

  @Column({ type: 'varchar', length: 4, nullable: true })
  year: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  user: User;
}
