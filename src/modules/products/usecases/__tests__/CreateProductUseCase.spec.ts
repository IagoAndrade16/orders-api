import { find } from '../../../../core/DependencyInjection';
import { Product } from '../../entities/Product';
import { ProductsRepository, productsRepositoryAlias } from '../../repositories/ProductsRepository';
import { CreateProductUseCase } from '../CreateProductUseCase';

const usecase = find(CreateProductUseCase);
const productsRepository = find<ProductsRepository>(productsRepositoryAlias);

const mockedProduct = {
	name: 'Product',
	description: 'Description',
	price: 10,
	imageUrl: 'http://image.com/image.png',
	userId: 'user-id',
};

it('should create a product', async () => {
	jest.spyOn(productsRepository, 'insert').mockResolvedValueOnce({} as Product);

	await usecase.execute(mockedProduct);

	expect(productsRepository.insert).toHaveBeenCalledWith(mockedProduct);
	expect(productsRepository.insert).toHaveBeenCalledTimes(1);
});
