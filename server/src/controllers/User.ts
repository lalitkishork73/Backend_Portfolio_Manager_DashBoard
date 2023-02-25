import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY:any = process.env.SECRET_KEY;
const CreateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone, email, password } = req.body;
        const data = req.body;

        const checkUnique = await UserModel.findOne({ phone, email });
        if (checkUnique) {
            return res.status(400).json({ status: false, message: 'user already exists' });
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        data['password'] = hash;

        const setUser = await UserModel.create(data);
        if (!setUser) {
            return res.status(400).json({ status: false, message: 'bad request' });
        }
        return res.status(201).json({ status: true, message: 'Created', data: setUser });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};
const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const checkUnique = await UserModel.findOne({ email: data.email });
        if (!checkUnique) {
            return res.status(404).json({ status: false, message: 'user not exists' });
        }

        bcrypt.compare(data.password, checkUnique.password, (err, result) => {
            if (result) {
                let token = jwt.sign(
                    {
                        userId: checkUnique._id.toString(),
                        email: checkUnique.email
                    },
                    SECRET_KEY,
                    { expiresIn: '2h' }
                );
                // res.setHeader('Authorization', 'Bearer', token);
                return res.status(201).send({
                    status: true,
                    message: 'Successfully loggedin',
                    userId: checkUnique._id,
                    token: token
                });
            } else {
                return res.status(401).send({
                    status: false,
                    message: 'login denied '
                });
            }
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

export default { CreateUser, LoginUser };
