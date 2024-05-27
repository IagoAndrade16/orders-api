/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';

import { OrderPaymentMethod, OrderStatus } from '../entities/Order';
import { CreateOrderUseCase } from '../usecases/CreateOrderUseCase';

@injectable()
export class CreateOrderController {
	constructor(
		@inject(CreateOrderUseCase)
		private createOrderUseCase: CreateOrderUseCase,
	) {}

    private body = yup.object().shape({
    	userName: yup.string().required().max(100),
    	userPhone: yup.string().required().max(45),
    	userEmail: yup.string().email().required().max(100),
    	userAddress: yup.string().required(),
    	products: yup.array().of(yup.object().shape({
    		productId: yup.string().required(),
    		quantityOfProduct: yup.number().required().min(1),
    	})).min(1).required(),
    	paymentMethod: yup.string().required().oneOf(Object.values(OrderPaymentMethod)),
    });

    async handle(req: Request, res: Response): Promise<Response> {
    	const body = await this.body.validate(req.body, { abortEarly: false });

    	const response = await this.createOrderUseCase.execute({
    		...body,
    		paymentMethod: body.paymentMethod as OrderPaymentMethod,
    		status: OrderStatus.DELIVERY_ROUTE,
    	});

    	return res.status(201).send({ ...response });
    }
}
