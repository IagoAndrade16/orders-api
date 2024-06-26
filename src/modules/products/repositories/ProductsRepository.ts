import { Product } from '../entities/Product';

export type ProductsRepository = {
	insert(data: CreateProductDTO): Promise<Product>;
	updateById(id: string, data: UpdateProductDTO): Promise<void>;
	findById(id: string): Promise<Product | null>;
	fetchItems(filters: FetchProductsDTO): Promise<Product[]>;
	countItems(filters: CountProductsDTO): Promise<number>;
	delete(id: string): Promise<void>;
}

export type CreateProductDTO = Pick<Product, 'name' | 'description' | 'price' | 'imageUrl' | 'userId'>;

export type UpdateProductDTO = {
	name?: string;
	description?: string;
	price?: number;
	imageUrl?: string | null;
};

export type FetchProductsDTO = {
	page?: number;
	pageSize?: number;
	name?: string;
};

export type CountProductsDTO = {
	name?: string;
}

export const productsRepositoryAlias = 'ProductsRepository';
