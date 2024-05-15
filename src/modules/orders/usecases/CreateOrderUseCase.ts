/* eslint-disable no-mixed-spaces-and-tabs */
import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { OrderStatus } from '../entities/Order';
import { CreateOrderDTO, OrdersRepository, ordersRepositoryAlias } from '../repositories/OrdersRepository';

export type CreateOrderUseCaseInput = CreateOrderDTO;

export type CreateOrderUseCaseOutput = CreateOrderDTO & {
	orderId: string;
};

@singleton()
export class CreateOrderUseCase implements UseCase<CreateOrderUseCaseInput, CreateOrderUseCaseOutput> {
	constructor(
    @inject(ordersRepositoryAlias)
    private readonly ordersRepository: OrdersRepository,
	) {}

	async execute(input: CreateOrderUseCaseInput): Promise<CreateOrderUseCaseOutput> {
		const orderCreated = await this.ordersRepository.create({
			...input,
			status: OrderStatus.PREPARE_LIST,
		});

		return {
			products: orderCreated.products,
			userAddress: orderCreated.userAddress,
			userName: orderCreated.userName,
			userEmail: orderCreated.userEmail,
			userPhone: orderCreated.userPhone,
			orderId: orderCreated.id,
			paymentMethod: orderCreated.paymentMethod,
			status: orderCreated.status,
		};
	}
}
