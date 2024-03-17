import { find } from '../../../../core/DependencyInjection';
import { HashProvider, hashProviderAlias } from '../../../../providers/hash/HashProvider';
import { DomainError } from '../../../../server/errors/DomainError';
import { User } from '../../entities/User';
import { UsersRepository, usersRepositoryAlias } from '../../repositories/UsersRepository';
import { CreateUserUseCase, CreateUserUseCaseInput } from '../CreateUserUseCase';

const usecase = find(CreateUserUseCase);
const usersRepo = find<UsersRepository>(usersRepositoryAlias);
const hashProvider = find<HashProvider>(hashProviderAlias);

const input: CreateUserUseCaseInput = {
	email: 'email@email.com',
	name: 'name',
	password: 'password',
};

it('should throw EMAIL_ALREADY_EXISTS if email already exists', async () => {
	const mockedUser = { email: input.email } as User;
	jest.spyOn(usersRepo, 'findByEmail').mockResolvedValue(mockedUser);

	await expect(usecase.execute(input)).rejects.toEqual(new DomainError(400, 'EMAIL_ALREADY_EXISTS'));

	expect(usersRepo.findByEmail).toBeCalledWith(input.email);
	expect(usersRepo.findByEmail).toBeCalledTimes(1);
});

it('should create a new user', async () => {
	jest.spyOn(usersRepo, 'findByEmail').mockResolvedValue(null);
	jest.spyOn(hashProvider, 'hash').mockResolvedValue('hashedPassword');
	jest.spyOn(usersRepo, 'create').mockResolvedValue({} as User);

	await usecase.execute(input);

	expect(usersRepo.findByEmail).toBeCalledWith(input.email);
	expect(usersRepo.findByEmail).toBeCalledTimes(1);

	expect(hashProvider.hash).toBeCalledWith(input.password);
	expect(hashProvider.hash).toBeCalledTimes(1);

	expect(usersRepo.create).toBeCalledWith({ ...input, password: 'hashedPassword' });
	expect(usersRepo.create).toBeCalledTimes(1);
});
