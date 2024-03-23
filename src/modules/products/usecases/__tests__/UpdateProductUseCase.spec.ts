import { find } from '../../../../core/DependencyInjection';
import { DomainError } from '../../../../server/errors/DomainError';
import { Product } from '../../entities/Product';
import { ProductsRepository, productsRepositoryAlias } from '../../repositories/ProductsRepository';
import { UpdateProductUseCase } from '../UpdateProductUseCase';

const usecase = find(UpdateProductUseCase);
const productsRepo = find<ProductsRepository>(productsRepositoryAlias);

it('should throw PRODUCT_NOT_FOUND if product does not exist', async () => {
	jest.spyOn(productsRepo, 'findById').mockResolvedValueOnce(null);

	await expect(usecase.execute({ productId: '1', userId: '1' })).rejects.toEqual(new DomainError(400, 'PRODUCT_NOT_FOUND'));
});

it('should throw PRODUCT_NOT_FOUND if product does not belong to the user', async () => {
	jest.spyOn(productsRepo, 'findById').mockResolvedValueOnce({ id: '1', userId: '2' } as Product);

	await expect(usecase.execute({ productId: '1', userId: '1' })).rejects.toEqual(new DomainError(400, 'PRODUCT_NOT_FOUND'));
});

it('should update a product', async () => {
	const product = {
		id: '1',
		name: 'Product 1',
		description: 'Description 1',
		price: 100,
		imageUrl: 'http://image.com/image.png',
	};

	const updatedProduct = {
		name: 'Product 1 Updated',
		description: 'Description 1 Updated',
		price: 200,
		imageUrl: 'http://image.com/image-updated.png',
	};

	jest.spyOn(productsRepo, 'updateById').mockResolvedValueOnce();
	jest.spyOn(productsRepo, 'findById').mockResolvedValueOnce({ id: product.id, userId: '1' } as Product);

	await usecase.execute({ productId: product.id, ...updatedProduct, userId: '1' });

	expect(productsRepo.updateById).toHaveBeenCalledTimes(1);
	expect(productsRepo.updateById).toHaveBeenCalledWith(product.id, updatedProduct);
});
