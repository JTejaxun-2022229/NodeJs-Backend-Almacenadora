'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import tasksRoutes from '../src/tasks/tareas.routes.js';

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.tasksPath = '/storage/v1/tasks';

        this.middlewares();
        this.connectioDB();
        this.routes();
    }

    async connectioDB(){
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(morgan('dev')) 
    }

    routes() {
        this.app.use(this.tasksPath, tasksRoutes)

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port)
        })
    }
}

export default Server;