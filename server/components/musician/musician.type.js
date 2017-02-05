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
            type: GraphQLID
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        instrument: {
            type: GraphQLString
        }
    })
});

export default MusicianType;
