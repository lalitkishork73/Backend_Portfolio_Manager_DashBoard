"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = exports.ValidateJoi = void 0;
const joi_1 = __importDefault(require("joi"));
const ValidateJoi = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        }
        catch (error) {
            console.log(error);
            return res.status(400).json(req.body);
        }
    };
};
exports.ValidateJoi = ValidateJoi;
exports.Schemas = {
    user: {
        create: joi_1.default.object({
            fname: joi_1.default.string().required(),
            lname: joi_1.default.string().required(),
            email: joi_1.default.string()
                .regex(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/)
                .required(),
            phone: joi_1.default.string()
                .length(10)
                .pattern(/^[0-9]+$/),
            password: joi_1.default.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)
                .required()
        }),
        login: joi_1.default.object({
            email: joi_1.default.string()
                .regex(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/)
                .required(),
            password: joi_1.default.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)
                .required()
        })
    },
    project: {
        create: joi_1.default.object({
            videoLink: joi_1.default.string().required(),
            projectName: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            viewCode: joi_1.default.string().required(),
            visitSite: joi_1.default.string().required(),
            user: joi_1.default.string().required()
        }),
        update: joi_1.default.object({
            videoLink: joi_1.default.string(),
            projectName: joi_1.default.string(),
            description: joi_1.default.string(),
            viewCode: joi_1.default.string(),
            visitSite: joi_1.default.string()
        })
    }
};
