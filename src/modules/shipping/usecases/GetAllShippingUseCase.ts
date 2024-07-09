import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { Shipping } from '../entities/Shipping';
import { ShippingRepository, shippingRepositoryAlias } from '../repostitories/ShippingsRepository';

@singleton()
export class GetAllShippingUseCase implements UseCase<void, Shipping[]> {
	constructor(
        @inject(shippingRepositoryAlias)
        private shippingRepository: ShippingRepository,
	) {}

	async execute(): Promise<Shipping[]> {
		return this.shippingRepository.findAll();
	}
}
