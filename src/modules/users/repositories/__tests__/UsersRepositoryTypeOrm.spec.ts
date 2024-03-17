import { v4 as uuidV4 } from 'uuid';

import { find } from '../../../../core/DependencyInjection';
import { Database } from '../../../../database/Database';
import { CreateUserDTO, UsersRepository, usersRepositoryAlias } from '../UsersRepository';

const repository = find<UsersRepository>(usersRepositoryAlias);

const sampleUserDTO: CreateUserDTO = {
	name: 'John Doe',
	email: 'email@email.com',
	password: '123456',
};

const deleteById = async (id: string) => {
	await Database.source.getRepository('users').delete({ id });
};

beforeAll(async () => {
	await Database.initialize();
});

afterAll(async () => {
	await Database.close();
});

describe('create', () => {
	it('should create a new user', async () => {
		const insertedUser = await repository.create(sampleUserDTO);

		const user = await repository.findById(insertedUser.id);

		await deleteById(insertedUser.id);

		expect(user).toEqual(insertedUser);
	});
});

describe('findById', () => {
	it('should return null if user does not exist', async () => {
		const user = await repository.findById(uuidV4());

		expect(user).toBeNull();
	});

	it('should return the user if it exists', async () => {
		const insertedUser = await repository.create(sampleUserDTO);

		const user = await repository.findById(insertedUser.id);

		await deleteById(insertedUser.id);

		expect(user).toEqual(insertedUser);
	});
});
