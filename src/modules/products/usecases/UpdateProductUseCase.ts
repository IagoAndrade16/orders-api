/* eslint-disable no-mixed-spaces-and-tabs */
import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { UpdateProductDTO, ProductsRepository, productsRepositoryAlias } from '../repositories/ProductsRepository';

export type UpdateProductUseCaseInput = UpdateProductDTO & {
	productId: string;
};

@singleton()
export class UpdateProductUseCase implements UseCase<UpdateProductUseCaseInput, void> {
	constructor(
    @inject(productsRepositoryAlias)
    private readonly productsRepository: ProductsRepository,
	) {}

	async execute(data: UpdateProductUseCaseInput): Promise<void> {
		return this.productsRepository.updateById(data.productId, {
			name: data.name,
			description: data.description,
			price: data.price,
			imageUrl: data.imageUrl,
		});
	}
}
