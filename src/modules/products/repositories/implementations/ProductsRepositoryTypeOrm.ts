/* eslint-disable no-mixed-spaces-and-tabs */
import { FindManyOptions, Like } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Database } from '../../../../database/Database';
import { Product } from '../../entities/Product';
import {
	CountProductsDTO,
	CreateProductDTO, FetchProductsDTO, ProductsRepository, UpdateProductDTO,
} from '../ProductsRepository';

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

    async findById(id: string): Promise<Product | null> {
    	return this.repository.findOneBy({ id });
    }

    async fetchItems(filters: FetchProductsDTO): Promise<Product[]> {
    	const { page = 1, pageSize = 10 } = filters;
    	const options: FindManyOptions<Product> = {
    		skip: (page - 1) * pageSize,
    		take: pageSize,
    		where: { deleted: false },
    		order: { createdAt: 'ASC' },
    	};

    	if (filters.name) {
    		options.where = { ...options.where, name: Like(`%${filters.name}%`) };
    	}

    	return this.repository.find(options);
    }

    async delete(id: string): Promise<void> {
    	await this.repository.update(id, {
    		deleted: true,
    		deletedAt: new Date(),
    	});
    }

    async countItems(filters: CountProductsDTO): Promise<number> {
    	const options: FindManyOptions<Product> = { where: { deleted: false } };

    	if (filters.name) {
    		options.where = { ...options.where, name: Like(`%${filters.name}%`) };
    	}

    	return this.repository.count(options);
    }
}
