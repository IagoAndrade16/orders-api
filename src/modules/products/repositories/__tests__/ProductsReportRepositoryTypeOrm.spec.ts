import { find } from '../../../../core/DependencyInjection';
import { Database } from '../../../../database/Database';
import { ProductReport } from '../../entities/ProductReport';
import { ProductsReportRepository, productsReportRepositoryAlias } from '../ProductsReportRepository';

const repository = find<ProductsReportRepository>(productsReportRepositoryAlias);

beforeAll(async () => {
	await Database.initialize();
});

afterAll(async () => {
	await Database.close();
});

describe('insert', () => {
	it('should insert a product', async () => {
		const productReport = await repository.insert({
			productId: '1',
			quantity: 10,
		});

		await Database.source.getRepository(ProductReport).delete(productReport.id);

		expect(productReport).toMatchObject({
			id: expect.any(String),
			productId: '1',
			quantity: 10,
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		});
	});
});
