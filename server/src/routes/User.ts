import express from 'express';
const router = express.Router();
import controller from '../controllers/User';
// import { Schemas, ValidateJoi } from '../middleware/Joi';

router.post('/newuser', controller.CreateUser);
router.post('/login', controller.LoginUser);

export = router;
