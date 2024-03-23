/* eslint-disable no-mixed-spaces-and-tabs */
import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { DomainError } from '../../../server/errors/DomainError';
import { ProductsRepository, productsRepositoryAlias } from '../repositories/ProductsRepository';

export type DeleteProductUseCaseInput = {
	productId: string;
	userId: string;
}

export type DeleteProductUseCaseOutput = void;

@singleton()
export class DeleteProductUseCase implements UseCase<DeleteProductUseCaseInput, DeleteProductUseCaseOutput> {
	constructor(
    @inject(productsRepositoryAlias)
    private readonly productsRepository: ProductsRepository,
	) {}

	async execute(input: DeleteProductUseCaseInput): Promise<DeleteProductUseCaseOutput> {
		const product = await this.productsRepository.findById(input.productId);

		if (!product) {
			throw new DomainError(400, 'PRODUCT_NOT_FOUND');
		}

		if (product.userId !== input.userId) {
			throw new DomainError(400, 'PRODUCT_NOT_FOUND');
		}

		if (product.deletedAt) {
			throw new DomainError(400, 'PRODUCT_ALREADY_DELETED');
		}

		await this.productsRepository.delete(input.productId);
	}
}
