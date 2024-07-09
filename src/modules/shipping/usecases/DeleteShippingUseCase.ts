import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { DomainError } from '../../../server/errors/DomainError';
import { ShippingRepository, shippingRepositoryAlias } from '../repostitories/ShippingsRepository';

export type DeleteShippingUseCaseInput = {
	id: string;
}

@singleton()
export class DeleteShippingUseCase implements UseCase<DeleteShippingUseCaseInput, void> {
	constructor(
        @inject(shippingRepositoryAlias)
        private shippingRepository: ShippingRepository,
	) {}
	async execute(input: DeleteShippingUseCaseInput): Promise<void> {
		const shipping = await this.shippingRepository.findById(input.id);

		if (!shipping) {
			throw new DomainError(400, 'SHIPPING_NOT_FOUND');
		}

		await this.shippingRepository.deleteById(input.id);
	}
}
