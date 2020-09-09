import IUsersRepository from '../repositories/IUserRepository';
import {injectable, inject} from 'tsyringe'

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
// import User from '../infra/typeorm/entities/User';

// import AppError from '@shared/err/AppError';

interface IRequest {
  email: string;
}

injectable();
class SendForgotPasswordEmailService {
  constructor(
    @inject('usersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
    ) { }

  public async execute({email}: IRequest): Promise<void> {
    this.mailProvider.sendMail( email, 'pedido de recuperação de email recebido');
  }
}

export default SendForgotPasswordEmailService;
