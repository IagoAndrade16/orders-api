/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';

import { RegisterShippingUseCase } from '../usecases/RegisterShippingUseCase';

@injectable()
export class RegisterShippingController {
	constructor(
        @inject(RegisterShippingUseCase)
        private registerShippingUseCase: RegisterShippingUseCase,
	) {}

    private bodySchema = yup.object().shape({
    	city: yup.string().required(),
    	value: yup.number().required(),
    });

    async handle(req: Request, res: Response): Promise<Response> {
    	const body = await this.bodySchema.validate(req.body, { abortEarly: false });

    	const response = await this.registerShippingUseCase.execute({
    		...body,
    	});

    	return res.status(200).send({
    		status: 'SUCCESS',
    		result: response,
    	});
    }
}
