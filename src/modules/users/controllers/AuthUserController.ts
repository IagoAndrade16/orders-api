import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { Utils } from '../../../core/Utils';
import { DomainError } from '../../../server/errors/DomainError';
import { AuthUserUseCase } from '../usecases/AuthUserUseCase';

@injectable()
export class AuthUserController {
	constructor(
    @inject(AuthUserUseCase)
    private authUserUseCase: AuthUserUseCase,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		const [email, password] = Utils.getBasicAuthContentFromReq(req);

		if (!email) {
			throw new DomainError(401, null);
		}

		const authUserUseCaseRes = await this.authUserUseCase.execute({
			email,
			password,
		});

		return res.status(200).json({
			status: 'OK',
			result: authUserUseCaseRes,
		});
	}
}
