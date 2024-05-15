import { Order, OrderPaymentMethod, OrderStatus } from '../entities/Order';

export type OrdersRepository = {
	create(data: CreateOrderDTO): Promise<Order>;
	fetchItems(filters: FetchItemsDTO): Promise<Order[]>;
	findById(id: string): Promise<Order | null>;
	updateById(id: string, data: Partial<Order>): Promise<void>;
}

export const ordersRepositoryAlias = 'OrdersRepository';

export type CreateOrderDTO = {
	userName: string;
	userPhone: string;
	userEmail: string;
	userAddress: string;
	products: OrderProductDTO[];
	paymentMethod: OrderPaymentMethod;
	status: OrderStatus;
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
