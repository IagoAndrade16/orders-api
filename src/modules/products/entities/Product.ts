import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryColumn({ length: 100 })
  id: string;

  @Column({ length: 100, type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'float', nullable: false, default: 0 })
  price: number;

  @Column({ type: 'text', nullable: true, default: null })
  imageUrl: string | null;

  @Column({ type: 'datetime', default: 'now()' })
  createdAt: Date;

  @Column({ type: 'datetime', default: 'now()' })
  updatedAt: Date;
}
