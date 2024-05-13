/* eslint-disable no-restricted-syntax */
/* eslint-disable no-mixed-spaces-and-tabs */
import moment from 'moment';
import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { DomainError } from '../../../server/errors/DomainError';
import { Product } from '../../products/entities/Product';
import { ProductsRepository, productsRepositoryAlias } from '../../products/repositories/ProductsRepository';
import { Order } from '../entities/Order';
import { OrdersRepository, ordersRepositoryAlias } from '../repositories/OrdersRepository';

export type GetSingleOrderUseCaseInput = {
	orderId: string;
}

export type GetSingleOrderUseCaseOutput = Pick<Order, 'id' | 'userAddress' | 'userName' | 'userPhone' | 'paymentMethod' | 'userEmail'> & {
	products: {
		id: string;
		name: string;
		price: number;
		imgUrl: string;
		quantity: number;
	}[],
	createdAt: string;
}

@singleton()
export class GetSingleOrderUseCase implements UseCase<GetSingleOrderUseCaseInput, GetSingleOrderUseCaseOutput | null> {
	constructor(
    @inject(ordersRepositoryAlias)
    private readonly ordersRepository: OrdersRepository,

    @inject(productsRepositoryAlias)
    private readonly productsRepository: ProductsRepository,
	) {}

	async execute(input: GetSingleOrderUseCaseInput): Promise<GetSingleOrderUseCaseOutput | null> {
		const order = await this.ordersRepository.findById(input.orderId);

		if (!order) {
			return null;
		}

		const products: Product[] = [];

		for (const product of order.products) {
			const productData = await this.productsRepository.findById(product.productId);
			if (productData) {
				products.push(productData);
			}
		}

		return {
			id: order.id,
			createdAt: moment(order.createdAt).format('DD/MM/YYYY HH:mm:ss'),
			userAddress: order.userAddress,
			userName: order.userName,
			userEmail: order.userEmail,
			userPhone: order.userPhone,
			paymentMethod: order.paymentMethod,
			products: products.map((product) => {
				return {
					id: product.id,
					name: product.name,
					price: product.price,
					quantity: order.products.filter((p) => p.productId === product.id)[0].quantityOfProduct,
					imgUrl: product.imageUrl ?? '',
				};
			}),
		};
	}
}
