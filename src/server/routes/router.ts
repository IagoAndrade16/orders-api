import { Router } from 'express';

import { app } from '../app';
import { ordersRoutes } from './orders.routes';
import { productsRouter } from './products.routes';
import { usersRouter } from './users.routes';

export const appRouter = Router();

appRouter.use('/users', usersRouter);
appRouter.use('/product', productsRouter);
appRouter.use('/orders', ordersRoutes);
