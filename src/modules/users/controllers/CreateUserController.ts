/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';

import { Utils } from '../../../core/Utils';
import { CreateUserUseCase } from '../usecases/CreateUserUseCase';

@injectable()
export class CreateUserController {
	constructor(
		@inject(CreateUserUseCase)
		private createUserUseCase: CreateUserUseCase,
	) {}

    private body = yup.object().shape({
    	name: yup.string().required(),
    	password: yup.string().required().min(8),
    	email: yup.string().required().email().max(100),
    });

    async handle(req: Request, res: Response): Promise<Response> {
    	const body = await this.body.validate(req.body, { abortEarly: false });

    	await this.createUserUseCase.execute(body);

    	return res.status(201).send();
    }
}
