/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';

import { UpdateShippingUseCase } from '../usecases/UpdateShippingUseCase';

@injectable()
export class UpdateShippingController {
	constructor(
	@inject(UpdateShippingUseCase)
	private updateShippingUseCase: UpdateShippingUseCase,
	) {}

    private paramsSchema = yup.object().shape({
    	id: yup.string().required(),
    });

	private bodySchema = yup.object().shape({
		city: yup.string().optional(),
		value: yup.number().optional(),
	});

	async handle(req: Request, res: Response): Promise<Response> {
    	const { city, value } = await this.bodySchema.validate(req.body, { abortEarly: false });
		const { id } = await this.paramsSchema.validate(req.params, { abortEarly: false });

		await this.updateShippingUseCase.execute({
			city,
			value,
			id,
		});

    	return res.status(200).send();
	}
}
