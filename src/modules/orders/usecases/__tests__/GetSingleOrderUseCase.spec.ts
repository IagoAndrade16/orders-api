import { find } from '../../../../core/DependencyInjection';
import { DomainError } from '../../../../server/errors/DomainError';
import { Product } from '../../../products/entities/Product';
import { ProductsRepository, productsRepositoryAlias } from '../../../products/repositories/ProductsRepository';
import { Order } from '../../entities/Order';
import { OrdersRepository, ordersRepositoryAlias } from '../../repositories/OrdersRepository';
import { GetSingleOrderUseCase } from '../GetSingleOrderUseCase';

const usecase = find(GetSingleOrderUseCase);
const ordersRepo = find<OrdersRepository>(ordersRepositoryAlias);
const productsRepo = find<ProductsRepository>(productsRepositoryAlias);

it('should return null if order not exists', async () => {
	jest.spyOn(ordersRepo, 'findById').mockResolvedValueOnce(null);

	const res =	await usecase.execute({ orderId: '1' });

	expect(res).toBeNull();
	expect(ordersRepo.findById).toBeCalledWith('1');
	expect(ordersRepo.findById).toBeCalledTimes(1);
});

it('should return order with products', async () => {
	jest.spyOn(ordersRepo, 'findById').mockResolvedValueOnce({
		createdAt: new Date(),
		userAddress: 'address',
		userName: 'name',
		userPhone: 'phone',
		products: [{ productId: '1', quantityOfProduct: 1 }],
	} as Order);

	jest.spyOn(productsRepo, 'findById').mockResolvedValueOnce({
		id: '1',
	} as Product);

	const result = await usecase.execute({ orderId: '1' });

	expect(result).toEqual({
		createdAt: expect.any(String),
		userAddress: 'address',
		userName: 'name',
		userPhone: 'phone',
		products: [{
			id: '1',
			imgUrl: '',
			name: undefined,
			price: undefined,
			quantity: 1,
		}],
	});

	expect(ordersRepo.findById).toBeCalledWith('1');
	expect(ordersRepo.findById).toBeCalledTimes(1);

	expect(productsRepo.findById).toBeCalledWith('1');
	expect(productsRepo.findById).toBeCalledTimes(1);
});
