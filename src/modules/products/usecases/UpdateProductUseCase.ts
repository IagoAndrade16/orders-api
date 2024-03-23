/* eslint-disable no-mixed-spaces-and-tabs */
import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { DomainError } from '../../../server/errors/DomainError';
import { UpdateProductDTO, ProductsRepository, productsRepositoryAlias } from '../repositories/ProductsRepository';

export type UpdateProductUseCaseInput = UpdateProductDTO & {
	productId: string;
	userId: string;
};

@singleton()
export class UpdateProductUseCase implements UseCase<UpdateProductUseCaseInput, void> {
	constructor(
    @inject(productsRepositoryAlias)
    private readonly productsRepository: ProductsRepository,
	) {}

	async execute(data: UpdateProductUseCaseInput): Promise<void> {
		const product = await this.productsRepository.findById(data.productId);

		if (!product) {
			throw new DomainError(400, 'PRODUCT_NOT_FOUND');
		}

		if (product.userId !== data.userId) {
			throw new DomainError(400, 'PRODUCT_NOT_FOUND');
		}

		return this.productsRepository.updateById(data.productId, {
			name: data.name,
			description: data.description,
			price: data.price,
			imageUrl: data.imageUrl,
		});
	}
}
