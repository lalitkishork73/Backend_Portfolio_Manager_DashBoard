import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import {Project} from '../models/ProjectModel'
import {User} from '../models/UserModel'