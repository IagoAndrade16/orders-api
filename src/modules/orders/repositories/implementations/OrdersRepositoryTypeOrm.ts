/* eslint-disable no-mixed-spaces-and-tabs */
import { FindOptionsWhere } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Database } from '../../../../database/Database';
import { Order } from '../../entities/Order';
import { CreateOrderDTO, FetchItemsDTO, OrdersRepository } from '../OrdersRepository';

export class OrdersRepositoryTypeOrm implements OrdersRepository {
  private repository = Database.source.getRepository(Order);

  async create(data: CreateOrderDTO): Promise<Order> {
  	const id = uuid();
  	const order = this.repository.create({ ...data, id });
  	return this.repository.save(order);
  }

  async fetchItems(filters: FetchItemsDTO): Promise<Order[]> {
  	const { page = 1, pageSize = 10 } = filters;
  	const whereOptions: FindOptionsWhere<Order> = {};

  	if (filters.email) {
  		whereOptions.userEmail = filters.email;
  	}

  	return this.repository.find({ skip: (page - 1) * pageSize, take: pageSize, where: whereOptions });
  }

  async findById(id: string): Promise<Order | null> {
  	return this.repository.findOne({ where: { id } });
  }
}
