/* eslint-disable no-mixed-spaces-and-tabs */
import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { DateRange } from '../../../objects/DateRange';
import { Product } from '../entities/Product';
import { ListProductsReportResult, ProductsReportRepository, productsReportRepositoryAlias } from '../repositories/ProductsReportRepository';
import { ProductsRepository, productsRepositoryAlias } from '../repositories/ProductsRepository';

export type ListProductsReportUseCaseInput = {
	page?: number;
	pageSize?: number;
	dateFilters?: DateRange;
}

export type ListProductsReportUseCaseOutput = ListProductsReportResult[];

@singleton()
export class ListProductsReportUseCase implements UseCase<ListProductsReportUseCaseInput, ListProductsReportUseCaseOutput> {
	constructor(
    @inject(productsReportRepositoryAlias)
    private readonly productsReportRepository: ProductsReportRepository,
	) {}

	async execute(filters: ListProductsReportUseCaseInput): Promise<ListProductsReportUseCaseOutput> {
		return this.productsReportRepository.list(filters);
	}
}
