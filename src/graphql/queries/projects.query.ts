import {
    GraphQLType,
    GraphQLList,
} from 'graphql';


import { GraphQLQuery } from './abstract.query'
import {ProjectType} from "../types/project.type";
import App from "../../app";


export class ProjectsQuery implements GraphQLQuery {

    public type = new GraphQLList(ProjectType);

    public description: "List of all projects";

    public resolve = async function () {

        return App.modelsApp.projects;
    }    

}