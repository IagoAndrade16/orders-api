import { v4 as uuid } from 'uuid';

import { Database } from '../../../../database/Database';
import { Shipping } from '../../entities/Shipping';
import { InsertShippingDTO, ShippingRepository, UpdateShippingDTO } from '../ShippingsRepository';

export class ShippingRepositoryTypeOrm implements ShippingRepository {
	private repository = Database.source.getRepository(Shipping);

	async insert(data: InsertShippingDTO): Promise<void> {
		const id = uuid();
		await this.repository.insert({ ...data, id });
	}

	async findAll(): Promise<Shipping[]> {
		return this.repository.find();
	}

	async findById(id: string): Promise<Shipping | null> {
		return this.repository.findOneBy({ id });
	}

	async updateById(id: string, data: UpdateShippingDTO) {
		await this.repository.update(id, data);
	}

	async deleteById(id: string): Promise<void> {
		await this.repository.delete({ id });
	}
}
