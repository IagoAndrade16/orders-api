/* eslint-disable no-mixed-spaces-and-tabs */
import { v4 as uuid } from 'uuid';

import { Database } from '../../../../database/Database';
import { User } from '../../entities/User';
import { CreateUserDTO, UsersRepository } from '../UsersRepository';

export class UsersRepositoryTypeOrm implements UsersRepository {
    private repository = Database.source.getRepository(User);

    async create(data: CreateUserDTO): Promise<User> {
    	const id = uuid();
    	const user = this.repository.create({ ...data, id });

    	await this.repository.insert(user);
    	return user;
    }

    async findById(id: string): Promise<User | null> {
    	return this.repository.findOneBy({ id });
    }
}
