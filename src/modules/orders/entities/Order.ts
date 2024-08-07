/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { OrderProductDTO } from '../repositories/OrdersRepository';

export enum OrderPaymentMethod {
	CASH = 'cash',
	CREDIT_CARD = 'credit-card',
	PIX = 'pix',
	DEBIT_CARD = 'debit-card',
}

export enum OrderStatus {
	PREPARE_LIST = 'Em preparação',
	DELIVERY_ROUTE = 'Rota de entrega',
	FINISHED = 'Entregue'
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

  @Column({
  	type: 'varchar', length: 255, nullable: true, enum: OrderStatus,
  })
  status: OrderStatus;

  @Column({ type: 'varchar', length: 100, nullable: false })
  shippingId: string;
}
