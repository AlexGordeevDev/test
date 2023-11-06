
import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';
import {ProjectsQuery} from "./queries/projects.query";
import {CreateNewProject} from "./mutations/save.mutation";


class Query {

    public name = "Projects";
    public description = "Projects Application Schema Query Root";

    public fields = function () {

        return {

            projects: new ProjectsQuery()

        }

    }

}

class Mutation {

    public name = "ProjectsMutations";
    public description = "Manipulations with projects";

    public fields = function () {

        return {

            createProject: new CreateNewProject()

        }

    }

}

export const schema = new GraphQLSchema({

    query: new GraphQLObjectType(new Query()),

    mutation: new GraphQLObjectType(new Mutation())

});