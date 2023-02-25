import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import ProjectModel from '../models/ProjectModel';

const CreateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};
const UpdateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};
const GetProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};
const DeleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

export default { CreateProject, UpdateProject, GetProject, DeleteProject };
