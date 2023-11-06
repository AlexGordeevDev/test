import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLType,
} from 'graphql';
import {ProjectType} from "../types/project.type";
import App from "../../app";


export interface GraphQLMutation {
    type: GraphQLType;
    description: string;
    resolve: Function;
}

export class CreateNewProject implements GraphQLMutation {

    public type = ProjectType;
    public description: "Projects";

    public args = {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
    };

    public resolve = async function (root, args: Arguments) {
        const project = App.modelsApp.add_project(args.name)
        return project
    }

}

export class CreateNewStage implements GraphQLMutation {

    public type = ProjectType;
    public description: "Projects";

    public args = {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        project_uid: {
            type: new GraphQLNonNull(GraphQLString)
        }
    };

    public resolve = async function (root, args: Arguments) {
        return App.modelsApp.add_stage(
            args.project_uid,
            args.name
        )
    }

}