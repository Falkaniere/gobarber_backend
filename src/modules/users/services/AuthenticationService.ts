import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {injectable, inject} from 'tsyringe'

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUserRepository';
import AppError from '@shared/err/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
    ) { }
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // metodo que compara a senha recebida com a senha criptografada
    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticationService;
