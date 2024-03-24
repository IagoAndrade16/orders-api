/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { FetchOrdersUseCase } from '../usecases/FetchOrdersUseCase';

@injectable()
export class FetchOrdersController {
	constructor(
		@inject(FetchOrdersUseCase)
		private fetchOrdersUseCase: FetchOrdersUseCase,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
    	const fetchedOrders = await this.fetchOrdersUseCase.execute({
    		page: req.query.page ? Number(req.query.page) : undefined,
    		pageSize: req.query.pageSize ? Number(req.query.pageSize) : undefined,
    	});

    	return res.status(200).send(fetchedOrders);
	}
}
