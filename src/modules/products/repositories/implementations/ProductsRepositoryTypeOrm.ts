/* eslint-disable no-mixed-spaces-and-tabs */
import { v4 as uuid } from 'uuid';

import { Database } from '../../../../database/Database';
import { Product } from '../../entities/Product';
import { CreateProductDTO, ProductsRepository, UpdateProductDTO } from '../ProductsRepository';

export class ProductsRepositoryTypeOrm implements ProductsRepository {
    private repository = Database.source.getRepository(Product);

    async insert(data: CreateProductDTO): Promise<Product> {
    	const id = uuid();
    	const product = this.repository.create({ ...data, id });

    	await this.repository.insert(product);
    	return product;
    }

    async updateById(id: string, data: UpdateProductDTO): Promise<void> {
    	await this.repository.update(id, data);
    }
}
