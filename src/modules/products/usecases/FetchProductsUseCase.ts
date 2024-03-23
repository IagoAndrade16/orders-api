/* eslint-disable no-mixed-spaces-and-tabs */
import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { Product } from '../entities/Product';
import { ProductsRepository, productsRepositoryAlias } from '../repositories/ProductsRepository';

export type FetchProductsUseCaseInput = {
	page?: number;
	pageSize?: number;
}

export type FetchProductsUseCaseOutput = {
	products: Product[];
}

@singleton()
export class FetchProductsUseCase implements UseCase<FetchProductsUseCaseInput, FetchProductsUseCaseOutput> {
	constructor(
    @inject(productsRepositoryAlias)
    private readonly productsRepository: ProductsRepository,
	) {}

	async execute(filters: FetchProductsUseCaseInput): Promise<FetchProductsUseCaseOutput> {
		const products = await this.productsRepository.fetchItems(filters);

		return { products };
	}
}
