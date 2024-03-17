import { User } from '../entities/User';

export type UsersRepository = {
	create(data: CreateUserDTO): Promise<User>;
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
}

export type CreateUserDTO = Pick<User, 'email' | 'name' | 'password'>

export const usersRepositoryAlias = 'UsersRepository';
