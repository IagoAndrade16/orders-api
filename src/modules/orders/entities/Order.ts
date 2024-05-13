import { Column, Entity, PrimaryColumn } from 'typeorm';

import { OrderProductDTO } from '../repositories/OrdersRepository';

export enum OrderPaymentMethod {
	CASH = 'cash',
	CREDIT_CARD = 'credit-card',
	PIX = 'pix',
	DEBIT_CARD = 'debit-card',
}
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

  @Column({ type: 'varchar', length: 100 })
  userEmail: string;

  @Column({ type: 'json' })
  products: OrderProductDTO[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'enum', enum: OrderPaymentMethod, nullable: true })
  paymentMethod: OrderPaymentMethod;
}
