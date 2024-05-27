import { find } from '../../../../core/DependencyInjection';
import { ProductReport } from '../../../products/entities/ProductReport';
import { ProductsReportRepository, productsReportRepositoryAlias } from '../../../products/repositories/ProductsReportRepository';
import { Order, OrderPaymentMethod, OrderStatus } from '../../entities/Order';
import { OrdersRepository, ordersRepositoryAlias } from '../../repositories/OrdersRepository';
import { CreateOrderUseCase, CreateOrderUseCaseInput } from '../CreateOrderUseCase';

const usecase = find(CreateOrderUseCase);
const ordersRepository = find<OrdersRepository>(ordersRepositoryAlias);
const productsReportRepository = find<ProductsReportRepository>(productsReportRepositoryAlias);

const mockedOrder = {
	products: [{
		productId: '1',
		quantityOfProduct: 2,
	}],
	userAddress: 'John Doe Street',
	userName: 'John Doe',
	userPhone: '123456789',
	userEmail: 'email@email.com',
	paymentMethod: OrderPaymentMethod.CREDIT_CARD,
	status: OrderStatus.PREPARE_LIST,
} as CreateOrderUseCaseInput;

it('should create a order', async () => {
	jest.spyOn(ordersRepository, 'create').mockResolvedValueOnce({} as Order);
	jest.spyOn(productsReportRepository, 'insert').mockResolvedValueOnce({} as ProductReport);

	await usecase.execute(mockedOrder);

	expect(ordersRepository.create).toHaveBeenCalledWith(mockedOrder);
	expect(ordersRepository.create).toHaveBeenCalledTimes(1);

	expect(productsReportRepository.insert).toHaveBeenCalledTimes(mockedOrder.products.length);
	expect(productsReportRepository.insert).toHaveBeenCalledWith({ productId: mockedOrder.products[0].productId, quantity: mockedOrder.products[0].quantityOfProduct });
});
