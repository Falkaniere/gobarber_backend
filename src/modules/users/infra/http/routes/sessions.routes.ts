import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticationService from '@modules/users/services/AuthenticationService';

const sessionRoutes = Router();

sessionRoutes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authService = container.resolve(AuthenticationService);

  const { user, token } = await authService.execute({ email, password });

  // remover a senha do retorno para o backend
  delete user.password;

  return response.json({ user, token });
});

export default sessionRoutes;
