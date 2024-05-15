/* eslint-disable no-mixed-spaces-and-tabs */
import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { OrderStatus } from '../entities/Order';
import { OrdersRepository, ordersRepositoryAlias } from '../repositories/OrdersRepository';

export type UpdateOrderStatusUseCaseInput = {
	newStatus: OrderStatus;
	orderId: string;
}

export type UpdateOrderStatusUseCaseOutput = void;

@singleton()
export class UpdateOrderStatusUseCase implements UseCase<UpdateOrderStatusUseCaseInput, UpdateOrderStatusUseCaseOutput> {
	constructor(
    @inject(ordersRepositoryAlias)
    private readonly ordersRepository: OrdersRepository,
	) {}

	async execute(input: UpdateOrderStatusUseCaseInput): Promise<UpdateOrderStatusUseCaseOutput> {
		return this.ordersRepository.updateById(input.orderId, { status: input.newStatus });
	}
}
