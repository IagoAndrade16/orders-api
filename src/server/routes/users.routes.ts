import { Router } from 'express';

import { find } from '../../core/DependencyInjection';
import { AuthUserController } from '../../modules/users/controllers/AuthUserController';
import { CreateUserController } from '../../modules/users/controllers/CreateUserController';

export const usersRouter = Router();

usersRouter.post('/', (req, res) => find(CreateUserController).handle(req, res));
usersRouter.get('/auth', (req, res) => find(AuthUserController).handle(req, res));
