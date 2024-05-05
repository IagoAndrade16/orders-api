/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';

import { GetSingleOrderUseCase } from '../usecases/GetSingleOrderUseCase';

@injectable()
export class GetSingleOrderController {
	constructor(
		@inject(GetSingleOrderUseCase)
		private getSingleOrderUseCase: GetSingleOrderUseCase,
	) {}

    private paramsSchema = yup.object().shape({
    	id: yup.string().required(),
    });

    async handle(req: Request, res: Response): Promise<Response> {
    	const { id } = await this.paramsSchema.validate(req.params, { abortEarly: false });

    	const response = await this.getSingleOrderUseCase.execute({
    		orderId: id,
    	});

    	return res.status(200).send({ ...response });
    }
}
