import { NextFunction, Request, Response } from 'express';
import { createPrinter } from 'typescript';
import ProjectModel from '../models/ProjectModel';

    

const CreateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id=req.params.id;
        const data= req.body;   
        data['user']=id.toString();
        console.log(data)
        const createdProject = await ProjectModel.create(data);
        if (!createdProject) {
            return res.status(400).json({ status: false, message: 'bad Request' });
        }
        return res.status(201).json({ status: true, message: 'success', data: createdProject });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};
const UpdateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const id = req.params.id;

        const createdProject = await ProjectModel.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true });
        if (!createdProject) {
            return res.status(400).json({ status: false, message: 'bad Request' });
        }
        return res.status(201).json({ status: true, message: 'success', data: createdProject });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};
const GetProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const findAll = await ProjectModel.find({ isDeleted: false });
        if (findAll.length == 0) {
            return res.status(404).json({ status: false, message: 'Not FOund' });
        }
        return res.status(200).json({ status: true, message: 'success', data: findAll });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};
const DeleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const DeleteProject = await ProjectModel.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!DeleteProject) {
            return res.status(404).json({ status: false, message: 'not Found' });
        }
        return res.status(200).json({ status: true, message: 'Deleted Success' });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

export default { CreateProject, UpdateProject, GetProject, DeleteProject };
