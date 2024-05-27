/* eslint-disable no-mixed-spaces-and-tabs */
import { v4 as uuid } from 'uuid';

import { Database } from '../../../../database/Database';
import { ProductReport } from '../../entities/ProductReport';
import { InsertProductReportDTO, ProductsReportRepository } from '../ProductsReportRepository';

export class ProductsReportRepositoryTypeOrm implements ProductsReportRepository {
    private repository = Database.source.getRepository(ProductReport);

    async insert(data: InsertProductReportDTO): Promise<ProductReport> {
    	const id = uuid();
    	const productReport = this.repository.create({ ...data, id });

    	await this.repository.insert(productReport);
    	return productReport;
    }
}
