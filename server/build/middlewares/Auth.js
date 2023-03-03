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
const jwt = __importStar(require("jsonwebtoken"));
const ProjectModel_1 = __importDefault(require("../models/ProjectModel"));
const Authentication = async (req, res, next) => {
    try {
        let tokenWithBearer = req.headers['authorization'];
        if (!tokenWithBearer) {
            return res.status(400).send({ status: false, message: 'token is required' });
        }
        let tokenArray = tokenWithBearer.split(' ');
        let token = tokenArray[1];
        if (!token) {
            return res.status(404).send({ status: false, message: 'Invalid Token' });
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                return res.status(401).send({ status: false, message: err.message });
            }
            else {
                req['user'] = decode.userId;
                next();
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
const Authorization = async (req, res, next) => {
    try {
        let tokenId = req.user;
        let userId = req.params.id;
        const findUserId = await ProjectModel_1.default.findOne({ _id: userId });
        if (!findUserId)
            return res.status(404).send({ status: false, message: 'User not found' });
        const { user } = findUserId;
        if (tokenId.toString() !== user.toString()) {
            return res.status(403).send({ status: false, message: 'User not authorized' });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
exports.default = { Authentication, Authorization };
