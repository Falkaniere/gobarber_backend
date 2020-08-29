import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticationService';
import CreateUserService from './CreateUserService';

import AppError from '@shared/err/AppError';

describe('AuthenticateUser', () => {
  it('it should be able authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});
