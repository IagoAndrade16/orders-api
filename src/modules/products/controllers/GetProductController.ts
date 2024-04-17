/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';

import { GetProductUseCase } from '../usecases/GetProductUseCase';

@injectable()
export class GetProductController {
	constructor(
		@inject(GetProductUseCase)
		private getProductUseCase: GetProductUseCase,
	) {}

	private paramsSchema = yup.object().shape({
		id: yup.string().required(),
	});

	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = await this.paramsSchema.validate(req.params, { abortEarly: false });

		const getProductRes = await this.getProductUseCase.execute({
			id,
		});

		return res.status(200).send({ product: getProductRes.product });
	}
}
