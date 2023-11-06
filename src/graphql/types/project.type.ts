import {GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

class Project {

    public name = "Project";
    public description = "This represent an project";

    public fields = function () {

        return {

            uid: {
                type: new GraphQLNonNull(GraphQLString),
            },
            name: {
                type: new GraphQLNonNull(GraphQLString),
            },
            is_completed: {
                type: GraphQLBoolean
            },
        }

    }

}
class ProjectStage {
    public name = "Stages";
    public description = "This represent an project stages";

    public fields = function () {

        return {
            uid: {
                type: new GraphQLNonNull(GraphQLString),
            },
            name: {
                type: new GraphQLNonNull(GraphQLString),
            },
        }

    }
}

export const ProjectType = new GraphQLObjectType(new Project());