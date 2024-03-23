import { Router } from 'express';

import { find } from '../../core/DependencyInjection';
import { CreateProductController } from '../../modules/products/controllers/CreateProductController';
import { _ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const productsRouter = Router();

productsRouter.post('/', _ensureAuthenticated, (req, res) => find(CreateProductController).handle(req, res));
