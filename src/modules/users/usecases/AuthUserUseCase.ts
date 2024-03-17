import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { DomainError } from '../../../server/errors/DomainError';
import { User, UserAuthData } from '../entities/User';
import { UsersRepository, usersRepositoryAlias } from '../repositories/UsersRepository';

export type AuthUserInput = {
	email: string;
	password: string;
}

export type AuthUserOutput = {
	auth: UserAuthData;
	user: Pick<User, 'id' | 'email' | 'name' | 'createdAt'>;
}

@singleton()
export class AuthUserUseCase implements UseCase<AuthUserInput, AuthUserOutput> {
	constructor(
    @inject(usersRepositoryAlias)
    private usersRepository: UsersRepository,
	) {}

	async execute(input: AuthUserInput): Promise<AuthUserOutput> {
		const user = await this.usersRepository.findByEmail(input.email);

		if (!user) {
			throw new DomainError(401, 'USER_NOT_FOUND');
		}

		const passwordMatch = await User.comparePassword(input.password, user.password);

		if (!passwordMatch) {
			throw new DomainError(401, 'INVALID_USER');
		}

		const auth = await User.generateAuthData(user.id);

		return {
			auth,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				createdAt: user.createdAt,
			},
		};
	}
}
