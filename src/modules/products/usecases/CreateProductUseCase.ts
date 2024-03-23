/* eslint-disable no-mixed-spaces-and-tabs */
import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { CreateProductDTO, ProductsRepository, productsRepositoryAlias } from '../repositories/ProductsRepository';

export type CreateProductUseCaseInput = CreateProductDTO & {
	userId: string;
};

export type CreateProductUseCaseOutput = CreateProductDTO;

@singleton()
export class CreateProductUseCase implements UseCase<CreateProductUseCaseInput, CreateProductUseCaseOutput> {
	constructor(
    @inject(productsRepositoryAlias)
    private readonly productsRepository: ProductsRepository,
	) {}

	async execute(input: CreateProductUseCaseInput): Promise<CreateProductUseCaseOutput> {
		return this.productsRepository.insert({
			...input,
		});
	}
}
