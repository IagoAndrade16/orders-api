/* eslint-disable no-mixed-spaces-and-tabs */
import { v4 as uuid } from 'uuid';

import { Database } from '../../../../database/Database';
import { ProductReport } from '../../entities/ProductReport';
import {
	InsertProductReportDTO, ListProductsReportFiltersDTO, ListProductsReportResult, ProductsReportRepository,
} from '../ProductsReportRepository';

export class ProductsReportRepositoryTypeOrm implements ProductsReportRepository {
    private repository = Database.source.getRepository(ProductReport);

    async insert(data: InsertProductReportDTO): Promise<ProductReport> {
    	const id = uuid();
    	const productReport = this.repository.create({ ...data, id });

    	await this.repository.insert(productReport);
    	return productReport;
    }

    async list(filters: ListProductsReportFiltersDTO): Promise<ListProductsReportResult[]> {
    	let whereOptions = '';

    	if (filters.dateFilters) {
    		whereOptions = `WHERE products_report.createdAt BETWEEN '${filters.dateFilters.getStart}' AND '${filters.dateFilters.getEnd}'`;
    	}
    	console.log(filters);
    	const query = `
				SELECT productId, products.name as productName, SUM(quantity) as totalQuantity
				FROM products_report
				INNER JOIN products ON products.id = products_report.productId
				${whereOptions}
				GROUP BY productId;
			`;

    	const result: ListProductsReportResult[] = await this.repository.query(query);

    	return result;
    }
}
