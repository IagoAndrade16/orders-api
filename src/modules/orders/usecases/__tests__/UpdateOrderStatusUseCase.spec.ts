import { find } from '../../../../core/DependencyInjection';
import { OrderStatus } from '../../entities/Order';
import { OrdersRepository, ordersRepositoryAlias } from '../../repositories/OrdersRepository';
import { UpdateOrderStatusUseCase } from '../UpdateOrderStatusUseCase';

const usecase = find(UpdateOrderStatusUseCase);
const ordersRepo = find<OrdersRepository>(ordersRepositoryAlias);

it('should update order status', async () => {
	jest.spyOn(ordersRepo, 'updateById').mockResolvedValueOnce();

	await usecase.execute({
		newStatus: OrderStatus.FINISHED,
		orderId: '123',
	});

	expect(ordersRepo.updateById).toHaveBeenCalledWith('123', { status: OrderStatus.FINISHED });
});
