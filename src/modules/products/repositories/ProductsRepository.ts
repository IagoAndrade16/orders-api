import { Product } from '../entities/Product';

export type ProductsRepository = {
	insert(data: CreateProductDTO): Promise<Product>;
	updateById(id: string, data: UpdateProductDTO): Promise<void>;
}

export type CreateProductDTO = Pick<Product, 'name' | 'description' | 'price' | 'imageUrl'>;

export type UpdateProductDTO = {
	name?: string;
	description?: string;
	price?: number;
	imageUrl?: string | null;
};

export const productsRepositoryAlias = 'ProductsRepository';
