/* eslint-disable no-mixed-spaces-and-tabs */
import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { OrdersRepository, ordersRepositoryAlias } from '../repositories/OrdersRepository';
import { GetSingleOrderUseCase, GetSingleOrderUseCaseOutput } from './GetSingleOrderUseCase';

export type FetchOrdersUseCaseInput = {
	page?: number;
	pageSize?: number;
	email?: string;
}

export type FetchOrdersUseCaseOutput = (GetSingleOrderUseCaseOutput | null)[];

@singleton()
export class FetchOrdersUseCase implements UseCase<FetchOrdersUseCaseInput, FetchOrdersUseCaseOutput> {
	constructor(
    @inject(ordersRepositoryAlias)
    private readonly ordersRepository: OrdersRepository,

		@inject(GetSingleOrderUseCase)
		private readonly getSingleOrderUseCase: GetSingleOrderUseCase,
	) {}

	async execute(filters: FetchOrdersUseCaseInput): Promise<FetchOrdersUseCaseOutput> {
		const orders = await this.ordersRepository.fetchItems(filters);
		return Promise.all(orders.map(async (order) => {
			return this.getSingleOrderUseCase.execute({ orderId: order.id });
		}));
	}
}
