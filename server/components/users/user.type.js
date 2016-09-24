import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean
} from 'graphql';

export default new GraphQLObjectType({
    name: 'UserType',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        username: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        idAdmin: {
            type: GraphQLBoolean
        }
    }
})
