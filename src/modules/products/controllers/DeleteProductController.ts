/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { DeleteProductUseCase } from '../usecases/DeleteProductUseCase';

@injectable()
export class DeleteProductController {
	constructor(
		@inject(DeleteProductUseCase)
		private deleteProductUseCase: DeleteProductUseCase,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
    	await this.deleteProductUseCase.execute({
    		productId: req.params.id,
			  userId: req.user!.id,
    	});

    	return res.status(204).send();
	}
}
