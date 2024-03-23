/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';

import { UpdateProductUseCase } from '../usecases/UpdateProductUseCase';

@injectable()
export class UpdateProductController {
	constructor(
		@inject(UpdateProductUseCase)
		private updateProductUseCase: UpdateProductUseCase,
	) {}

    private body = yup.object().shape({
    	name: yup.string().optional().max(100),
    	description: yup.string().optional(),
    	price: yup.number().optional(),
    	imageUrl: yup.string().optional(),
    });

    async handle(req: Request, res: Response): Promise<Response> {
    	const body = await this.body.validate(req.body, { abortEarly: false });
    	const { id: productId } = req.params;

    	await this.updateProductUseCase.execute({
    		...body,
    		productId,
    	});

    	return res.status(204).send();
    }
}
