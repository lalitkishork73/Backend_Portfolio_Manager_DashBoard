"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = __importDefault(require("../controllers/User"));
const Joi_1 = require("../middlewares/Joi");
router.post('/newuser', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.user.create), User_1.default.CreateUser);
router.post('/login', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.user.login), User_1.default.LoginUser);
module.exports = router;
