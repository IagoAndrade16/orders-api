import { find } from '../../../../core/DependencyInjection';
import { Order } from '../../entities/Order';
import { OrdersRepository, ordersRepositoryAlias } from '../../repositories/OrdersRepository';
import { CreateOrderUseCase, CreateOrderUseCaseInput } from '../CreateOrderUseCase';

const usecase = find(CreateOrderUseCase);
const ordersRepository = find<OrdersRepository>(ordersRepositoryAlias);

const mockedOrder = {
	products: [],
	userAddress: 'John Doe Street',
	userName: 'John Doe',
	userPhone: '123456789',
	userEmail: 'email@email.com',
} as CreateOrderUseCaseInput;

it('should create a order', async () => {
	jest.spyOn(ordersRepository, 'create').mockResolvedValueOnce({} as Order);

	await usecase.execute(mockedOrder);

	expect(ordersRepository.create).toHaveBeenCalledWith(mockedOrder);
	expect(ordersRepository.create).toHaveBeenCalledTimes(1);
});
