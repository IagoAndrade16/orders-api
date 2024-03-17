import { Router } from 'express';

import { usersRouter } from './users.routes';

export const appRouter = Router();

appRouter.use('/users', usersRouter);
