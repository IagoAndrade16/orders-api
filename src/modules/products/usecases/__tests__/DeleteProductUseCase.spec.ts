import { find } from '../../../../core/DependencyInjection';
import { DomainError } from '../../../../server/errors/DomainError';
import { Product } from '../../entities/Product';
import { ProductsRepository, productsRepositoryAlias } from '../../repositories/ProductsRepository';
import { DeleteProductUseCase } from '../DeleteProductUseCase';

const usecase = find(DeleteProductUseCase);
const productsRepo = find<ProductsRepository>(productsRepositoryAlias);

it('should throw PRODUCT_NOT_FOUND if product not found', async () => {
	jest.spyOn(productsRepo, 'findById').mockResolvedValue(null);

	const productId = 'product-id';
	const userId = 'user-id';

	await expect(usecase.execute({ productId, userId })).rejects.toEqual(new DomainError(400, 'PRODUCT_NOT_FOUND'));

	expect(productsRepo.findById).toHaveBeenCalledWith(productId);
	expect(productsRepo.findById).toHaveBeenCalledTimes(1);
});

it('should throw PRODUCT_NOT_FOUND if user does not have permission to delete', async () => {
	const mockedProduct = {
		id: 'product-id',
		userId: 'user-id-1',
	} as Product;
	jest.spyOn(productsRepo, 'findById').mockResolvedValue(mockedProduct);

	const userId = 'user-id-2';

	await expect(usecase.execute({ productId: mockedProduct.id, userId })).rejects.toEqual(new DomainError(400, 'PRODUCT_NOT_FOUND'));

	expect(productsRepo.findById).toHaveBeenCalledWith(mockedProduct.id);
	expect(productsRepo.findById).toHaveBeenCalledTimes(1);
});

it('should throw PRODUCT_ALREADY_DELETED if product is already deleted', async () => {
	const mockedProduct = {
		id: 'product-id',
		userId: 'user-id',
		deletedAt: new Date(),
	} as Product;
	jest.spyOn(productsRepo, 'findById').mockResolvedValue(mockedProduct);

	const userId = 'user-id';

	await expect(usecase.execute({ productId: mockedProduct.id, userId })).rejects.toEqual(new DomainError(400, 'PRODUCT_ALREADY_DELETED'));

	expect(productsRepo.findById).toHaveBeenCalledWith(mockedProduct.id);
	expect(productsRepo.findById).toHaveBeenCalledTimes(1);
});

it('should delete product', async () => {
	const mockedProduct = {
		id: 'product-id',
		userId: 'user-id',
	} as Product;
	jest.spyOn(productsRepo, 'findById').mockResolvedValue(mockedProduct);
	jest.spyOn(productsRepo, 'delete').mockResolvedValue();

	const userId = 'user-id';

	await usecase.execute({ productId: mockedProduct.id, userId });

	expect(productsRepo.findById).toHaveBeenCalledWith(mockedProduct.id);
	expect(productsRepo.findById).toHaveBeenCalledTimes(1);

	expect(productsRepo.delete).toHaveBeenCalledWith(mockedProduct.id);
	expect(productsRepo.delete).toHaveBeenCalledTimes(1);
});
