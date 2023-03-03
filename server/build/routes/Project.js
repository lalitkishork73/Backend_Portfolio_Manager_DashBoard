"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Project_1 = __importDefault(require("../controllers/Project"));
const Joi_1 = require("../middlewares/Joi");
const Auth_1 = __importDefault(require("../middlewares/Auth"));
router.post('/createproject', Auth_1.default.Authentication, (0, Joi_1.ValidateJoi)(Joi_1.Schemas.project.create), Project_1.default.CreateProject);
router.get('/getproject', Auth_1.default.Authentication, Project_1.default.GetProject);
router.patch('/updateproject/:id', Auth_1.default.Authentication, Auth_1.default.Authorization, (0, Joi_1.ValidateJoi)(Joi_1.Schemas.project.update), Project_1.default.UpdateProject);
router.delete('/deleteproject/:id', Auth_1.default.Authentication, Auth_1.default.Authorization, Project_1.default.DeleteProject);
module.exports = router;
