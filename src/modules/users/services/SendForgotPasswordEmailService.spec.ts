import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEmail from './SendForgotPasswordEmailService';
import AppError from '@shared/err/AppError';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recovery the password using email', async () => {
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserRepository = new FakeUserRepository();
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');


    const sendForgotPasswordEmail = new SendForgotPasswordEmail(fakeUserRepository, fakeMailProvider);

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

});
