import IUsersRepository from '../repositories/IUserRepository';
import {injectable, inject} from 'tsyringe'
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/err/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

injectable();
class CreateUserService {
  constructor(
    @inject('usersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
    ) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });


    return user;
  }
}

export default CreateUserService;
