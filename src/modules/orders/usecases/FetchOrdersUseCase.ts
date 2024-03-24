/* eslint-disable no-mixed-spaces-and-tabs */
import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { Order } from '../entities/Order';
import { OrdersRepository, ordersRepositoryAlias } from '../repositories/OrdersRepository';

export type FetchOrdersUseCaseInput = {
	page?: number;
	pageSize?: number;
}

export type FetchOrdersUseCaseOutput = {
	orders: Order[];
}

@singleton()
export class FetchOrdersUseCase implements UseCase<FetchOrdersUseCaseInput, FetchOrdersUseCaseOutput> {
	constructor(
    @inject(ordersRepositoryAlias)
    private readonly ordersRepository: OrdersRepository,
	) {}

	async execute(filters: FetchOrdersUseCaseInput): Promise<FetchOrdersUseCaseOutput> {
		const orders = await this.ordersRepository.fetchItems(filters);

		return { orders };
	}
}
