'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import tareaRoutes from '../src/tasks/tareas.routes.js'

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.tareaPath = '/storage/v1/task'

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
        this.app.use(express.json())
        this.app.use(morgan('dev')) 
    }

    routes() {
        this.app.use(this.tareaPath, tareaRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port)
        })
    }
}

export default Server;