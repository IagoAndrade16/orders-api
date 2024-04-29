/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';

import { FetchProductsUseCase } from '../usecases/FetchProductsUseCase';

@injectable()
export class FetchProductsController {
	constructor(
		@inject(FetchProductsUseCase)
		private fetchProductsUseCase: FetchProductsUseCase,
	) {}

	private bodySchema = yup.object().shape({
		name: yup.string().optional().default(undefined),
	});

	async handle(req: Request, res: Response): Promise<Response> {
		const { name } = await this.bodySchema.validate(req.body, { abortEarly: false });

		const fetchedProducts = await this.fetchProductsUseCase.execute({
			page: req.query.page ? Number(req.query.page) : undefined,
			pageSize: req.query.pageSize ? Number(req.query.pageSize) : undefined,
			name,
		});

		// console.log('fetchedProducts', fetchedProducts.quantity);

		return res.status(200).send(fetchedProducts);
	}
}
