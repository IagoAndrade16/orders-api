import { Router } from 'express';

import { find } from '../../core/DependencyInjection';
import { CreateProductController } from '../../modules/products/controllers/CreateProductController';
import { DeleteProductController } from '../../modules/products/controllers/DeleteProductController';
import { FetchProductsController } from '../../modules/products/controllers/FetchProductsController';
import { UpdateProductController } from '../../modules/products/controllers/UpdateProductController';
import { _ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const productsRouter = Router();

productsRouter.post('/', _ensureAuthenticated, (req, res) => find(CreateProductController).handle(req, res));
productsRouter.patch('/:id', _ensureAuthenticated, (req, res) => find(UpdateProductController).handle(req, res));
productsRouter.post('/list', (req, res) => find(FetchProductsController).handle(req, res));
productsRouter.delete('/:id', _ensureAuthenticated, (req, res) => find(DeleteProductController).handle(req, res));
