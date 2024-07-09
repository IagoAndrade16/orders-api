import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { ShippingRepository, shippingRepositoryAlias } from '../repostitories/ShippingsRepository';

export type RegisterShippingUseCaseInput = {
	city: string;
	value: number;
}

@singleton()
export class RegisterShippingUseCase implements UseCase<RegisterShippingUseCaseInput, void> {
	constructor(
        @inject(shippingRepositoryAlias)
        private shippingRepository: ShippingRepository,
	) {}

	async execute(input: RegisterShippingUseCaseInput): Promise<void> {
		await this.shippingRepository.insert({
			city: input.city,
			value: input.value,
		});
	}
}
