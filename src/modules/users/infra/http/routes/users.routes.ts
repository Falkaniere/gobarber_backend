import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../Controllers/UsersController';
import ensureAuthenticated from '../Middleware/ensureAuthenticade';
import UserAvatarController from '../Controllers/UserAvatarController';

const userAvatarController = new UserAvatarController();
const usersController = new UsersController();

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', usersController.create);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'), userAvatarController.update);

export default usersRoutes;
