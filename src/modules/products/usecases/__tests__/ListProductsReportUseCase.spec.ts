import { find } from '../../../../core/DependencyInjection';
import { DateRange } from '../../../../objects/DateRange';
import { ProductsReportRepository, productsReportRepositoryAlias } from '../../repositories/ProductsReportRepository';
import { ListProductsReportUseCase } from '../ListProductsReportUseCase';

const usecase = find(ListProductsReportUseCase);
const productsReportRepository = find<ProductsReportRepository>(productsReportRepositoryAlias);

it('should list products report', async () => {
	const filters = {
		dateFilters: new DateRange(new Date().toString(), new Date().toString()),
	};

	const listSpy = jest.spyOn(productsReportRepository, 'list');
	listSpy.mockResolvedValue([]);

	await usecase.execute(filters);

	expect(listSpy).toHaveBeenCalledWith(filters);
	expect(listSpy).toHaveBeenCalledTimes(1);
});
