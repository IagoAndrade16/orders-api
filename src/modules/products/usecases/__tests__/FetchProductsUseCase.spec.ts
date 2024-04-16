import { find } from '../../../../core/DependencyInjection';
import { Product } from '../../entities/Product';
import { ProductsRepository, productsRepositoryAlias } from '../../repositories/ProductsRepository';
import { FetchProductsUseCase } from '../FetchProductsUseCase';

const usecase = find(FetchProductsUseCase);
const productsRepo = find<ProductsRepository>(productsRepositoryAlias);

it('should return list of products', async () => {
	const products = [
		{
			id: '1',
			name: 'Product 1',
			description: 'Description 1',
			price: 100,
			imageUrl: 'http://image.com/image.png',
		},
		{
			id: '2',
			name: 'Product 2',
			description: 'Description 2',
			price: 200,
			imageUrl: 'http://image.com/image2.png',
		},
	];

	jest.spyOn(productsRepo, 'fetchItems').mockResolvedValueOnce(products as Product[]);
	jest.spyOn(productsRepo, 'countItems').mockResolvedValueOnce(products.length);

	const result = await usecase.execute({});

	expect(result).toEqual({ products, quantity: products.length });

	expect(productsRepo.fetchItems).toHaveBeenCalledTimes(1);
	expect(productsRepo.fetchItems).toHaveBeenCalledWith({});

	expect(productsRepo.countItems).toHaveBeenCalledTimes(1);
	expect(productsRepo.countItems).toHaveBeenCalledWith({ name: undefined });
});
