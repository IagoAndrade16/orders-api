import { Order } from '../entities/Order';

export type OrdersRepository = {
	create(data: CreateOrderDTO): Promise<Order>;
	fetchItems(filters: FetchItemsDTO): Promise<Order[]>;
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

export type FetchItemsDTO = {
	page?: number;
	pageSize?: number;
}
