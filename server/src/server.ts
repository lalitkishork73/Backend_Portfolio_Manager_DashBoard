import express, { Application, Response, Request, NextFunction } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './configs/config';
import User from './routes/User';
import Project from './routes/Project';
const app: Application = express();
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

/*connect Mongoose*/

mongoose.set('strictQuery', false);
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('Mongodb connected');
        StartServer();
    })
    .catch((err) => console.log(err));

const StartServer = () => {
    app.use((req, res, next) => {
        /* Log the request */
        console.log(`Incoming -> method: [${req.method}] -Url:[${req.url}] -IP[${req.socket.remoteAddress}]`);

        res.on(`finish`, () => {
            console.log(`Incoming -> method: [${req.method}] -Url:[${req.url}] -IP[${req.socket.remoteAddress}] -Status:[${res.statusCode}]`);
        });

        next();
    });

    app.use(express.static(path.join(__dirname, '../../', '/client', '/build')))
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /** Rules of our API */
    app.use((req: Request, res: Response, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /* Routes */

    app.use('/user', User);
    app.use('/project', Project);

    /* Error Handling  */
    app.use('*', (req: Request, res: Response) => {
        return res.status(400).json({ status: false, message: 'bad url' });
    });

    app.use((req: Request, res: Response, next: NextFunction) => {
        const error = new Error('not found');
        console.log(error.message);
        return res.status(404).json({ message: error.message });
    });

    http.createServer(app).listen(config.server.port, () => {
        console.log(`Server listening on port ${config.server.port}`);
    });
};
