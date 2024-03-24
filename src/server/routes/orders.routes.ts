import { Router } from 'express';

import { find } from '../../core/DependencyInjection';
import { CreateOrderController } from '../../modules/orders/controllers/CreateOrderController';

export const ordersRoutes = Router();

ordersRoutes.post('/', (req, res) => find(CreateOrderController).handle(req, res));
