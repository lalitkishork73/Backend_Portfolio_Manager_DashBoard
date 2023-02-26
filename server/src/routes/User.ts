import express from 'express';
const router = express.Router();
import controller from '../controllers/User';
import { Schemas, ValidateJoi } from '../middlewares/Joi';


router.post('/newuser', ValidateJoi(Schemas.user.create), controller.CreateUser);
router.post('/login', ValidateJoi(Schemas.user.login), controller.LoginUser);

export = router;
