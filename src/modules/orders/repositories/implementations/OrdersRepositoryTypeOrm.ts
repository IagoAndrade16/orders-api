/* eslint-disable no-mixed-spaces-and-tabs */
import { v4 as uuid } from 'uuid';

import { Database } from '../../../../database/Database';
import { Order } from '../../entities/Order';
import { CreateOrderDTO, OrdersRepository } from '../OrdersRepository';

export class OrdersRepositoryTypeOrm implements OrdersRepository {
  private repository = Database.source.getRepository(Order);

  async create(data: CreateOrderDTO): Promise<Order> {
  	const id = uuid();
  	const order = this.repository.create({ ...data, id });
  	return this.repository.save(order);
  }
}
