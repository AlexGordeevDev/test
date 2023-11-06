import * as express from 'express';
import * as dotenv from "dotenv"
import * as GraphQLHTTP from 'express-graphql';
import { Server } from 'http';
import {ProjectApplication} from "./projects/model";
import {schema} from "./graphql/shema";

dotenv.config();



class App {

    public express: express.Application;
    public server: Server;
    public port = process.env.PORT || 3000;
    private modelsApp: ProjectApplication

    constructor() {

        this.express = express();

        this.server = this.express.listen(this.port);
        this.init()
        this.graphql();

    }

    private init(){
        this.modelsApp = new ProjectApplication()
        this.modelsApp.init()
    }
    private graphql() {

        this.express.use('/graphql', GraphQLHTTP({
            schema: schema,
            graphiql: true,
        }));

    }

}

export default new App();