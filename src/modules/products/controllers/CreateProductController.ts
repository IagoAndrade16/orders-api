/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';

import { Utils } from '../../../core/Utils';
import { CreateProductUseCase } from '../usecases/CreateProductUseCase';

@injectable()
export class CreateProductController {
	constructor(
		@inject(CreateProductUseCase)
		private createProductUseCase: CreateProductUseCase,
	) {}

    private body = yup.object().shape({
    	name: yup.string().required().max(100),
    	description: yup.string().required(),
    	price: yup.number().required(),
    	imageUrl: yup.string().optional().nullable().default(null),
    });

    async handle(req: Request, res: Response): Promise<Response> {
    	const body = await this.body.validate(req.body, { abortEarly: false });

    	const response = await this.createProductUseCase.execute(body);

    	return res.status(201).send(response);
    }
}
