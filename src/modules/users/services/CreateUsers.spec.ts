import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import AppError from '@shared/err/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsers = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUsers.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsers = new CreateUserService(fakeUserRepository,fakeHashProvider);

    await createUsers.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(createUsers.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});
