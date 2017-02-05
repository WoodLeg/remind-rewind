import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList
} from 'graphql';

import MusicianType from '../musician/musician.type';

const SongType = new GraphQLObjectType({
    name: 'song',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        url: {
            type: GraphQLString
        },
        musicians: {
            type: new GraphQLList(MusicianType)
        }
    })
});

export default SongType;
