import { Order } from '../entities/Order';

export type OrdersRepository = {
	create(data: CreateOrderDTO): Promise<Order>;
}

export const ordersRepositoryAlias = 'OrdersRepository';

export type CreateOrderDTO = {
	userName: string;
	userPhone: string;
	userAddress: string;
	products: OrderProductDTO[];
}

export type OrderProductDTO = {
	productId: string;
	quantityOfProduct: number;
}
