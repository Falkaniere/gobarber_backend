import { Router } from 'express';
import AuthenticationService from '../services/AuthenticationService';

const sessionRoutes = Router();

sessionRoutes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authService = new AuthenticationService();

    const { user, token } = await authService.execute({ email, password });

    // remover a senha do retorno para o backend
    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionRoutes;
