import { Router } from 'express';

import { find } from '../../core/DependencyInjection';
import { CreateOrderController } from '../../modules/orders/controllers/CreateOrderController';
import { FetchOrdersController } from '../../modules/orders/controllers/FetchOrdersController';
import { GetSingleOrderController } from '../../modules/orders/controllers/GetSingleOrderController';
import { UpdateOrderStatusController } from '../../modules/orders/controllers/UpdateOrderStatusController';
import { _ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const ordersRoutes = Router();

ordersRoutes.post('/', (req, res) => find(CreateOrderController).handle(req, res));
ordersRoutes.post('/fetch', (req, res) => find(FetchOrdersController).handle(req, res));
ordersRoutes.get('/:id', (req, res) => find(GetSingleOrderController).handle(req, res));
ordersRoutes.patch('/:orderId/status', (req, res) => find(UpdateOrderStatusController).handle(req, res));
