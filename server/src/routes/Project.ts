import express from 'express';
const router = express.Router();
import controller from '../controllers/Project';
import { Schemas, ValidateJoi } from '../middlewares/Joi';
import Auth from '../middlewares/Auth';

router.post('/createproject/:id', Auth.Authentication, ValidateJoi(Schemas.project.create), controller.CreateProject);
router.get('/getproject', Auth.Authentication, controller.GetProject);
router.patch('/updateproject/:id', Auth.Authentication, Auth.Authorization, ValidateJoi(Schemas.project.update), controller.UpdateProject);
router.delete('/deleteproject/:id', Auth.Authentication, Auth.Authorization, controller.DeleteProject);

export = router;
