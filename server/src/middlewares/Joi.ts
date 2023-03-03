import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { Project } from '../models/ProjectModel';
import { User } from '../models/UserModel';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            console.log(error);
            return res.status(400).json(req.body);
        }
    };
};

export const Schemas = {
    user: {
        create: Joi.object<User>({
            fname: Joi.string().required(),
            lname: Joi.string().required(),
            email: Joi.string()
                .regex(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/)
                .required(),
            phone: Joi.string()
                .length(10)
                .pattern(/^[0-9]+$/),
            password: Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)
                .required()
        }),
        login: Joi.object<User>({
            email: Joi.string()
                .regex(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/)
                .required(),
            password: Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)
                .required()
        })
    },
    project: {
        create: Joi.object<Project>({
            videoLink: Joi.string().required(),
            projectName: Joi.string().required(),
            description: Joi.string().required(),
            viewCode: Joi.string().required(),
            visitSite: Joi.string().required(),
            user: Joi.string().required()
        }),
        update: Joi.object<Project>({
            videoLink: Joi.string(),
            projectName: Joi.string(),
            description: Joi.string(),
            viewCode: Joi.string(),
            visitSite: Joi.string()
        })
    }
};
