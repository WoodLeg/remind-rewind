import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString
} from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Desfinition of the User Type.',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'ID of the User'
        },
        firstName: {
            type: GraphQLString,
            description: 'First name of the User'
        },
        lastName: {
            type: GraphQLString,
            description: 'Last name of the User'
        },
        email: {
            type: GraphQLString,
            description: 'Email of the User'
        },
        isAdmin: {
            type: GraphQLBoolean,
            description: 'Does the user is Admin ?'
        },
        isModerator: {
            type: GraphQLBoolean,
            descritpion: 'Does the user is Moderator ?'
        }
    })
});

export default UserType;
