import { Request, Response } from 'express';
import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { DomainError } from '../../../server/errors/DomainError';
import { ShippingRepository, shippingRepositoryAlias } from '../repostitories/ShippingsRepository';

export type UpdateShippingUseCaseInput = {
	id: string,
	city?: string,
	value?: number,
}

@singleton()
export class UpdateShippingUseCase implements UseCase<UpdateShippingUseCaseInput, void> {
	constructor(
        @inject(shippingRepositoryAlias)
        private shippingRepository: ShippingRepository,
	) {}

	async execute(input: UpdateShippingUseCaseInput): Promise<void> {
		const shipping = await this.shippingRepository.findById(input.id);

		if (!shipping) {
			throw new DomainError(400, 'SHIPPING_NOT_FOUND');
		}

		await this.shippingRepository.updateById(input.id, {
			city: input.city,
			value: input.value,
		});
	}
}
