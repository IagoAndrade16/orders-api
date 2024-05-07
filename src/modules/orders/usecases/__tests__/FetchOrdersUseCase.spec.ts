import { find } from '../../../../core/DependencyInjection';
import { Order } from '../../entities/Order';
import { OrdersRepository, ordersRepositoryAlias } from '../../repositories/OrdersRepository';
import { FetchOrdersUseCase } from '../FetchOrdersUseCase';
import { GetSingleOrderUseCase } from '../GetSingleOrderUseCase';

const usecase = find(FetchOrdersUseCase);
const ordersRepo = find<OrdersRepository>(ordersRepositoryAlias);
const getSingleOrderUseCase = find(GetSingleOrderUseCase);

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

	const mockedSingleOrder = {
		id: orders[0].id,
		userName: orders[0].userName,
		userPhone: orders[0].userPhone,
		userAddress: orders[0].userAddress,
		createdAt: expect.any(String),
		products: [
			{
				id: 'Product 1',
				imgUrl: '',
				name: 'name',
				price: 10,
				quantity: 1,
			},
			{
				id: 'Product 2',
				imgUrl: '',
				name: 'name',
				price: 20,
				quantity: 2,
			},
		],
	};
	jest.spyOn(getSingleOrderUseCase, 'execute').mockResolvedValue(mockedSingleOrder);

	const result = await usecase.execute({});

	expect(result).toEqual([{ ...mockedSingleOrder }]);
});
