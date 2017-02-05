import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList
} from 'graphql';

const MusicianType = new GraphQLObjectType({
    name: 'musician',
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
        instrument: {
            type: GraphQLString
        }
    })
});

export default MusicianType;
