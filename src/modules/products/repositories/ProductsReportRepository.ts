import { Product } from '../entities/Product';
import { ProductReport } from '../entities/ProductReport';

export type ProductsReportRepository = {
	insert(data: InsertProductReportDTO): Promise<ProductReport>;
}

export type InsertProductReportDTO = {
	productId: string;
	quantity: number;
};

export const productsReportRepositoryAlias = 'ProductsReportRepository';
