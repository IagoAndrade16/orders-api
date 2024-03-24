import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100 })
  userName: string;

  @Column({ type: 'varchar', length: 45 })
  userPhone: string;

  @Column({ type: 'text' })
  userAddress: string;

  @Column({ type: 'json' })
  products: Record<string, any>;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
