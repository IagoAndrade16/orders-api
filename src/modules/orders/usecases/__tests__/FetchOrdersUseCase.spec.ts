import { find } from '../../../../core/DependencyInjection';
import { Order } from '../../entities/Order';
import { OrdersRepository, ordersRepositoryAlias } from '../../repositories/OrdersRepository';
import { FetchOrdersUseCase } from '../FetchOrdersUseCase';

const usecase = find(FetchOrdersUseCase);
const ordersRepo = find<OrdersRepository>(ordersRepositoryAlias);

it('should return list of orders', async () => {
	const orders = [
		{
			id: '1',
			userName: 'John Doe',
			userPhone: '123456789',
			userAddress: 'John Doe Street',
			products: [
				{
					productId: 'Product 1',
					quantityOfProduct: 1,
				},
				{
					productId: 'Product 2',
					quantityOfProduct: 2,
				},
			],
		},
	] as Order[];

	jest.spyOn(ordersRepo, 'fetchItems').mockResolvedValueOnce(orders);

	const result = await usecase.execute({});

	expect(result).toEqual({ orders });
});
