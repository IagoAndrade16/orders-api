import { find } from '../../../../core/DependencyInjection';
import { DomainError } from '../../../../server/errors/DomainError';
import { User } from '../../entities/User';
import { UsersRepository, usersRepositoryAlias } from '../../repositories/UsersRepository';
import { AuthUserUseCase } from '../AuthUserUseCase';

const usecase = find(AuthUserUseCase);
const usersRepo = find<UsersRepository>(usersRepositoryAlias);

const input = { email: 'email', password: 'password' };

it('should thorw USER_NOT_FOUND if user does not exist', async () => {
	jest.spyOn(usersRepo, 'findByEmail').mockResolvedValue(null);

	expect(async () => {
		await usecase.execute(input);
	}).rejects.toEqual(new DomainError(401, 'USER_NOT_FOUND'));

	expect(usersRepo.findByEmail).toBeCalledTimes(1);
	expect(usersRepo.findByEmail).toBeCalledWith('email');
});

it('should thorw INVALID_USER if password does not match', async () => {
	jest.spyOn(usersRepo, 'findByEmail').mockResolvedValue({ id: 'uuid', password: 'wrong password' } as User);

	expect(async () => {
		await usecase.execute(input);
	}).rejects.toEqual(new DomainError(401, 'INVALID_USER'));

	expect(usersRepo.findByEmail).toBeCalledTimes(1);
	expect(usersRepo.findByEmail).toBeCalledWith('email');
});

it('should return user data and auth token', async () => {
	const mockedUser = {
		id: 'uuid', password: 'password', email: 'email', name: 'name', createdAt: new Date(),
	} as User;
	jest.spyOn(usersRepo, 'findByEmail').mockResolvedValue(mockedUser);
	jest.spyOn(User, 'comparePassword').mockResolvedValue(true);

	const res = await usecase.execute(input);

	expect(usersRepo.findByEmail).toBeCalledTimes(1);
	expect(usersRepo.findByEmail).toBeCalledWith('email');

	expect(res.auth).toHaveProperty('token');
	expect(res.auth).toHaveProperty('expInSecs');
	expect(res.user).toEqual({
		id: mockedUser.id, email: mockedUser.email, name: mockedUser.name, createdAt: mockedUser.createdAt,
	});
});
