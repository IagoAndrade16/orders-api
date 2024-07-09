import { Shipping } from '../entities/Shipping';

export type ShippingRepository = {
	insert(data: InsertShippingDTO): Promise<void>;
	findAll(): Promise<Shipping[]>;
	findById(id: string): Promise<Shipping | null>;
	updateById(id: string, data: UpdateShippingDTO): Promise<void>;
	deleteById(id: string): Promise<void>
}

export type InsertShippingDTO = {
	city: string;
	value: number;
}

export type UpdateShippingDTO = Partial<InsertShippingDTO>;

export const shippingRepositoryAlias = 'ShippingRepository';
