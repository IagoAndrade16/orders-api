/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';

import { GetAllShippingUseCase } from '../usecases/GetAllShippingUseCase';

@injectable()
export class GetAllShippingController {
	constructor(
	    @inject(GetAllShippingUseCase)
	    private getAllShippingUseCase: GetAllShippingUseCase,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
    	const response = await this.getAllShippingUseCase.execute();

    	return res.status(200).send({
    		result: response,
    	});
	}
}
