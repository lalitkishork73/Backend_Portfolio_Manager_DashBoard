"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectModel_1 = __importDefault(require("../models/ProjectModel"));
const CreateProject = async (req, res, next) => {
    try {
        const data = req.body;
        const createdProject = await ProjectModel_1.default.create(data);
        if (!createdProject) {
            return res.status(400).json({ status: false, message: 'bad Request' });
        }
        return res.status(201).json({ status: true, message: 'success', data: createdProject });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
const UpdateProject = async (req, res, next) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const createdProject = await ProjectModel_1.default.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true });
        if (!createdProject) {
            return res.status(400).json({ status: false, message: 'bad Request' });
        }
        return res.status(201).json({ status: true, message: 'success', data: createdProject });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
const GetProject = async (req, res, next) => {
    try {
        const findAll = await ProjectModel_1.default.find({ isDeleted: false });
        if (findAll.length == 0) {
            return res.status(404).json({ status: false, message: 'Not FOund' });
        }
        return res.status(200).json({ status: true, message: 'success', data: findAll });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
const DeleteProject = async (req, res, next) => {
    try {
        const id = req.params.id;
        const DeleteProject = await ProjectModel_1.default.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!DeleteProject) {
            return res.status(404).json({ status: false, message: 'not Found' });
        }
        return res.status(200).json({ status: true, message: 'Deleted Success' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.default = { CreateProject, UpdateProject, GetProject, DeleteProject };
