/* eslint-disable no-mixed-spaces-and-tabs */
import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { DomainError } from '../../../server/errors/DomainError';
import { Product } from '../entities/Product';
import { ProductsRepository, productsRepositoryAlias } from '../repositories/ProductsRepository';

export type GetProductUseCaseInput = {
	id: string;
};

export type GetProductUseCaseOutput = {
	product: Product;
};

@singleton()
export class GetProductUseCase implements UseCase<GetProductUseCaseInput, GetProductUseCaseOutput> {
	constructor(
    @inject(productsRepositoryAlias)
    private readonly productsRepository: ProductsRepository,
	) {}

	async execute(input: GetProductUseCaseInput): Promise<GetProductUseCaseOutput> {
		const product = await this.productsRepository.findById(input.id);

		if (!product) {
			throw new DomainError(400, 'PRODUCT_NOT_FOUND');
		}

		return { product };
	}
}
