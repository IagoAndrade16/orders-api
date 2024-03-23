import { Router } from 'express';

import { find } from '../../core/DependencyInjection';
import { CreateProductController } from '../../modules/products/controllers/CreateProductController';
import { FetchProductsController } from '../../modules/products/controllers/FetchProductsController';
import { UpdateProductController } from '../../modules/products/controllers/UpdateProductController';
import { _ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const productsRouter = Router();

productsRouter.post('/', _ensureAuthenticated, (req, res) => find(CreateProductController).handle(req, res));
productsRouter.patch('/:id', _ensureAuthenticated, (req, res) => find(UpdateProductController).handle(req, res));
productsRouter.get('/', (req, res) => find(FetchProductsController).handle(req, res));
