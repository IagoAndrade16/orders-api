/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';

import { OrderStatus } from '../entities/Order';
import { UpdateOrderStatusUseCase } from '../usecases/UpdateOrderStatusUseCase';

@injectable()
export class UpdateOrderStatusController {
	constructor(
		@inject(UpdateOrderStatusUseCase)
		private updateOrderStatusUseCase: UpdateOrderStatusUseCase,
	) {}

    private bodySchema = yup.object().shape({
    	newStatus: yup.string().required().oneOf(Object.values(OrderStatus)),
    });

    private paramsSchema = yup.object().shape({
    	orderId: yup.string().required(),
    });

    async handle(req: Request, res: Response): Promise<Response> {
    	const body = await this.bodySchema.validate(req.body, { abortEarly: false });
    	const params = await this.paramsSchema.validate(req.params, { abortEarly: false });

    	await this.updateOrderStatusUseCase.execute({
    		newStatus: body.newStatus as OrderStatus,
    		orderId: params.orderId,
    	});

    	return res.status(204).send();
    }
}
