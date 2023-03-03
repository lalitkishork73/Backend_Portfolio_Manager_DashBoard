"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./configs/config");
const User_1 = __importDefault(require("./routes/User"));
const Project_1 = __importDefault(require("./routes/Project"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
/*connect Mongoose*/
mongoose_1.default.set('strictQuery', false);
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
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
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../', '/client', '/build')));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /* Routes */
    app.use('/user', User_1.default);
    app.use('/project', Project_1.default);
    /* Error Handling  */
    app.use('*', (req, res) => {
        return res.status(400).json({ status: false, message: 'bad url' });
    });
    app.use((req, res, next) => {
        const error = new Error('not found');
        console.log(error.message);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(app).listen(config_1.config.server.port, () => {
        console.log(`Server listening on port ${config_1.config.server.port}`);
    });
};
