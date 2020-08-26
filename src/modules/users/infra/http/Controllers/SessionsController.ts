import {Request, Response} from 'express';

import { container } from 'tsyringe';

import AuthenticationService from '@modules/users/services/AuthenticationService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response>{
    const { email, password } = request.body;

    const authService = container.resolve(AuthenticationService);

    const { user, token } = await authService.execute({ email, password });

    // remover a senha do retorno para o backend
    delete user.password;

    return response.json({ user, token });
  }
}
