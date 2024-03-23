import { find } from '../../../../core/DependencyInjection';
import { Product } from '../../entities/Product';
import { ProductsRepository, productsRepositoryAlias } from '../../repositories/ProductsRepository';
import { CreateProductUseCase } from '../CreateProductUseCase';

const usecase = find(CreateProductUseCase);
const productsRepository = find<ProductsRepository>(productsRepositoryAlias);

it('should create a product', async () => {
	jest.spyOn(productsRepository, 'insert').mockResolvedValueOnce({} as Product);

	await usecase.execute({
		name: 'Product',
		description: 'Description',
		price: 10,
		imageUrl: 'http://image.com/image.png',
	});

	expect(productsRepository.insert).toHaveBeenCalledWith({
		name: 'Product',
		description: 'Description',
		price: 10,
		imageUrl: 'http://image.com/image.png',
	});
	expect(productsRepository.insert).toHaveBeenCalledTimes(1);
});
