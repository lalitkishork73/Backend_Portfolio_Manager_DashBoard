import express from 'express';
const router = express.Router();
import controller from '../controllers/Project';
// import { Schemas, ValidateJoi } from '../middleware/Joi';

router.post('/createproject',controller.CreateProject);
router.get('/getproject',controller.GetProject);
router.put('/updateproject',controller.UpdateProject);
router.delete('/deleteproject',controller.DeleteProject);

export = router;
