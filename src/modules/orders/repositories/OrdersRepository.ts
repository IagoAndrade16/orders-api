import { Order } from '../entities/Order';

export type OrdersRepository = {
	create(data: CreateOrderDTO): Promise<Order>;
	fetchItems(filters: FetchItemsDTO): Promise<Order[]>;
	findById(id: string): Promise<Order | null>;
}

export const ordersRepositoryAlias = 'OrdersRepository';

export type CreateOrderDTO = {
	userName: string;
	userPhone: string;
	userEmail: string;
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
	email?: string;
}
