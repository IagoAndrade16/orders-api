import { type } from 'os';

import { DateRange } from '../../../objects/DateRange';
import { ProductReport } from '../entities/ProductReport';

export type ProductsReportRepository = {
	insert(data: InsertProductReportDTO): Promise<ProductReport>;
	list(filters: ListProductsReportFiltersDTO): Promise<ListProductsReportResult[]>;
}

export type InsertProductReportDTO = {
	productId: string;
	quantity: number;
};

export type ListProductsReportFiltersDTO = {
	page?: number;
	pageSize?: number;
	dateFilters?: DateRange;
};

export type	ListProductsReportResult = {
	productName: string;
	productId: string;
	totalQusntity: number;
};

export const productsReportRepositoryAlias = 'ProductsReportRepository';
