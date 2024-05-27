import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('products_report')
export class ProductReport {
  @PrimaryColumn({ length: 100 })
  id: string;

  @Column({ length: 100, type: 'varchar', nullable: false })
  productId: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'datetime', default: 'now()' })
  createdAt: Date;

  @Column({ type: 'datetime', default: 'now()' })
  updatedAt: Date;
}
