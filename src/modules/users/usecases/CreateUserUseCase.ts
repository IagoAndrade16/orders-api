/* eslint-disable no-mixed-spaces-and-tabs */
import { inject, singleton } from 'tsyringe';

import { UseCase } from '../../../core/UseCase';
import { HashProvider, hashProviderAlias } from '../../../providers/hash/HashProvider';
import { DomainError } from '../../../server/errors/DomainError';
import { CreateUserDTO, UsersRepository, usersRepositoryAlias } from '../repositories/UsersRepository';

export type CreateUserUseCaseInput = CreateUserDTO;

@singleton()
export class CreateUserUseCase implements UseCase<CreateUserUseCaseInput, void> {
	constructor(
    @inject(usersRepositoryAlias)
    private readonly usersRepository: UsersRepository,

    @inject(hashProviderAlias)
    private readonly hashProvider: HashProvider,
	) {}

	async execute(input: CreateUserUseCaseInput): Promise<void> {
		const emailAlreadyExists = await this.usersRepository.findByEmail(input.email);

		if (emailAlreadyExists) {
			throw new DomainError(400, 'EMAIL_ALREADY_EXISTS');
		}

		const hashedPassword = await this.hashProvider.hash(input.password);

		await this.usersRepository.create({
			...input,
			password: hashedPassword,
		});
	}
}
