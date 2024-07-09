import { Router } from 'express';

import { find } from '../../core/DependencyInjection';
import { DeleteShippingController } from '../../modules/shipping/controllers/DeleteShippingController';
import { GetAllShippingController } from '../../modules/shipping/controllers/GetAllShippingController';
import { RegisterShippingController } from '../../modules/shipping/controllers/RegisterShippingController';
import { UpdateShippingController } from '../../modules/shipping/controllers/UpdateShippingController';
import { _ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const shippingRouter = Router();

shippingRouter.post('/', _ensureAuthenticated, (req, res) => find(RegisterShippingController).handle(req, res));
shippingRouter.get('/', (req, res) => find(GetAllShippingController).handle(req, res));
shippingRouter.patch('/:id', _ensureAuthenticated, (req, res) => find(UpdateShippingController).handle(req, res));
shippingRouter.delete('/:id', _ensureAuthenticated, (req, res) => find(DeleteShippingController).handle(req, res));
