import { Router } from 'express';

import { productsRouter } from './products.routes';
import { usersRouter } from './users.routes';

export const appRouter = Router();

appRouter.use('/users', usersRouter);
appRouter.use('/product', productsRouter);
