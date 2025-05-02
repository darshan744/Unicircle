import Router from 'express'
import { deleteAllUser } from '../Controllers/Users.controller';

const router = Router();

router.delete("/deleteAll", deleteAllUser);

export default router