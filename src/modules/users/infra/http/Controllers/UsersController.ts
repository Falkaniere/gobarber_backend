import {Request, Response} from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response>{
    const { name, email, password } = request.body;

    const userService = container.resolve(CreateUserService);

    const user = await userService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }

  public async patch(request: Request, response: Response): Promise<Response>{

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    return response.json(user);
  }
}