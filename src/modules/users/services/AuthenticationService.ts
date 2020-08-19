import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {injectable, inject} from 'tsyringe'

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUserRepository';
import AppError from '@shared/err/AppError';

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
    private usersRepository: IUsersRepository, ) { }
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // metodo que compara a senha recebida com a senha criptografada
    const passwordMatched = await compare(password, user.password);

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
