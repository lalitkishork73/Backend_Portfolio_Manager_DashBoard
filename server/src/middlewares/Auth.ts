import * as jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
import ProjectModel from '../models/ProjectModel';

// export interface IGetUserAuthInfoRequest extends Request {
//     user: any; // or any other type
// }

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

const Authentication = async (req: Request, res: Response, next: NextFunction) => {
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

        jwt.verify(token, process.env.SECRET_KEY as string, (err: any, decode: any) => {
            if (err) {
                return res.status(401).send({ status: false, message: err.message });
            } else {
                req['user'] = decode.userId;
                next();
            }
        });
    } catch (error: any) {
        return res.status(500).json({ message: error });
    }
};
const Authorization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let tokenId = req.user;
        let userId = req.params.id;

        const findUserId: any = await ProjectModel.findOne({ _id: userId });
        if (!findUserId) return res.status(404).send({ status: false, message: 'User not found' });

        const { user } = findUserId;

        if (tokenId.toString() !== user.toString()) {
            return res.status(403).send({ status: false, message: 'User not authorized' });
        }
        next();
    } catch (error: any) {
        return res.status(500).json({ message: error });
    }
};

export default { Authentication, Authorization };
