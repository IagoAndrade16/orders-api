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

	async handle(req: Request, res: Response): Promise<Response> {
    	const fetchedProducts = await this.fetchProductsUseCase.execute({
    		page: req.query.page ? Number(req.query.page) : undefined,
    		pageSize: req.query.pageSize ? Number(req.query.pageSize) : undefined,
    	});

    	return res.status(200).send(fetchedProducts);
	}
}
