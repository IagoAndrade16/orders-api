import { find } from '../../../../core/DependencyInjection';
import { ProductsRepository, productsRepositoryAlias } from '../../repositories/ProductsRepository';
import { UpdateProductUseCase } from '../UpdateProductUseCase';

const usecase = find(UpdateProductUseCase);
const productsRepo = find<ProductsRepository>(productsRepositoryAlias);

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

	jest.spyOn(productsRepo, 'updateById').mockResolvedValueOnce(undefined);

	await usecase.execute({ productId: product.id, ...updatedProduct });

	expect(productsRepo.updateById).toHaveBeenCalledTimes(1);
	expect(productsRepo.updateById).toHaveBeenCalledWith(product.id, updatedProduct);
});
