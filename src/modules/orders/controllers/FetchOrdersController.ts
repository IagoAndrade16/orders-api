/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';

import { FetchOrdersUseCase } from '../usecases/FetchOrdersUseCase';

@injectable()
export class FetchOrdersController {
	constructor(
		@inject(FetchOrdersUseCase)
		private fetchOrdersUseCase: FetchOrdersUseCase,
	) {}

	private bodySchema = yup.object().shape({
		email: yup.string().optional()
			.default(undefined),
	});

	async handle(req: Request, res: Response): Promise<Response> {
		const body = await this.bodySchema.validate(req.body, { abortEarly: false });

		const fetchedOrders = await this.fetchOrdersUseCase.execute({
			page: req.query.page ? Number(req.query.page) : undefined,
			pageSize: req.query.pageSize ? Number(req.query.pageSize) : undefined,
			email: body.email,
		});

		return res.status(200).send(fetchedOrders);
	}
}
