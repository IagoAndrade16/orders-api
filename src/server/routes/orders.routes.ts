import { Router } from 'express';

import { find } from '../../core/DependencyInjection';
import { CreateOrderController } from '../../modules/orders/controllers/CreateOrderController';
import { FetchOrdersController } from '../../modules/orders/controllers/FetchOrdersController';
import { GetSingleOrderController } from '../../modules/orders/controllers/GetSingleOrderController';
import { _ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const ordersRoutes = Router();

ordersRoutes.post('/', (req, res) => find(CreateOrderController).handle(req, res));
ordersRoutes.get('/', _ensureAuthenticated, (req, res) => find(FetchOrdersController).handle(req, res));
ordersRoutes.get('/:id', (req, res) => find(GetSingleOrderController).handle(req, res));
