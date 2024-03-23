import { Product } from '../entities/Product';

export type ProductsRepository = {
	insert(data: CreateProductDTO): Promise<Product>;
}

export type CreateProductDTO = Pick<Product, 'name' | 'description' | 'price' | 'imageUrl'>;

export const productsRepositoryAlias = 'ProductsRepository';
