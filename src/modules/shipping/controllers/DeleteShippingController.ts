/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';

import { DeleteShippingUseCase } from '../usecases/DeleteShippingUseCase';
import { GetAllShippingUseCase } from '../usecases/GetAllShippingUseCase';

@injectable()
export class DeleteShippingController {
	constructor(
	    @inject(DeleteShippingUseCase)
	    private deleteShippingUseCase: DeleteShippingUseCase,
	) {}

    private paramsSchema = yup.object().shape({
    	id: yup.string().required(),
    });

    async handle(req: Request, res: Response): Promise<Response> {
    	const { id } = await this.paramsSchema.validate(req.params, { abortEarly: false });

    	await this.deleteShippingUseCase.execute({ id });

    	return res.status(200).send();
    }
}
