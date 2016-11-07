import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString
} from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        isAdmin: {
            type: GraphQLBoolean
        },
        isModerator: {
            type: GraphQLBoolean
        }
    })
});

export default UserType;
