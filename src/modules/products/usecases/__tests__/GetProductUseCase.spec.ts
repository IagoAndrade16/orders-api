import { find } from '../../../../core/DependencyInjection';
import { DomainError } from '../../../../server/errors/DomainError';
import { Product } from '../../entities/Product';
import { ProductsRepository, productsRepositoryAlias } from '../../repositories/ProductsRepository';
import { GetProductUseCase } from '../GetProductUseCase';

const usecase = find(GetProductUseCase);
const productsRepository = find<ProductsRepository>(productsRepositoryAlias);

it('should throw PRODUCT_NOT_FOUND', async () => {
	jest.spyOn(productsRepository, 'findById').mockResolvedValueOnce(null);

	await expect(usecase.execute({ id: '1' })).rejects.toEqual(new DomainError(400, 'PRODUCT_NOT_FOUND'));
});

const mockedProduct = {
	name: 'Product',
	description: 'Description',
	price: 10,
	imageUrl: 'http://image.com/image.png',
	userId: 'user-id',
} as Product;

const input = {
	id: '1',
};

it('should return a product', async () => {
	jest.spyOn(productsRepository, 'findById').mockResolvedValueOnce(mockedProduct);

	await usecase.execute({ id: input.id });

	expect(productsRepository.findById).toBeCalledTimes(1);
	expect(productsRepository.findById).toBeCalledWith(input.id);
});
