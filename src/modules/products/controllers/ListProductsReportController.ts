/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';

import { DateRange } from '../../../objects/DateRange';
import { ListProductsReportUseCase } from '../usecases/ListProductsReportUseCase';

@injectable()
export class ListProductsReportController {
	constructor(
		@inject(ListProductsReportUseCase)
		private listProductsReportUseCase: ListProductsReportUseCase,
	) {}

	private bodySchema = yup.object().shape({
		from: yup.date().optional().default(undefined),
		to: yup.date().optional().default(undefined),
	});

	async handle(req: Request, res: Response): Promise<Response> {
		const { from, to } = await this.bodySchema.validate(req.body, { abortEarly: false });

		const listProductsReportRes = await this.listProductsReportUseCase.execute({
			dateFilters: from && to ? new DateRange(from.toString(), to.toString()) : undefined,
		});

		return res.status(200).send(listProductsReportRes);
	}
}
