"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY;
const CreateUser = async (req, res, next) => {
    try {
        const { phone, email, password } = req.body;
        const data = req.body;
        const checkUnique = await UserModel_1.default.findOne({ phone, email });
        if (checkUnique) {
            return res.status(400).json({ status: false, message: 'user already exists' });
        }
        const saltRounds = 10;
        const salt = bcrypt_1.default.genSaltSync(saltRounds);
        const hash = bcrypt_1.default.hashSync(password, salt);
        data['password'] = hash;
        const setUser = await UserModel_1.default.create(data);
        if (!setUser) {
            return res.status(400).json({ status: false, message: 'bad request' });
        }
        return res.status(201).json({ status: true, message: 'Created', data: setUser });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
const LoginUser = async (req, res, next) => {
    try {
        const data = req.body;
        const checkUnique = await UserModel_1.default.findOne({ email: data.email });
        if (!checkUnique) {
            return res.status(404).json({ status: false, message: 'user not exists' });
        }
        bcrypt_1.default.compare(data.password, checkUnique.password, (err, result) => {
            if (result) {
                let token = jwt.sign({
                    userId: checkUnique._id.toString(),
                    email: checkUnique.email
                }, SECRET_KEY, { expiresIn: '2h' });
                // res.setHeader('Authorization', 'Bearer', token);
                return res.status(201).send({
                    status: true,
                    message: 'Successfully loggedin',
                    userId: checkUnique._id,
                    token: token
                });
            }
            else {
                return res.status(401).send({
                    status: false,
                    message: 'login denied '
                });
            }
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.default = { CreateUser, LoginUser };
