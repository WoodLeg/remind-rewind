import {
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema
} from 'graphql';

import SongQuery from './components/song/song.query';
import SongMutation from './components/song/song.mutation';

import MusicianQuery from './components/musician/musician.query';


const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'List of all data you can access.',
    fields: () => ({
        songs: SongQuery.songs,
        song: SongQuery.song,
        musicians: MusicianQuery.musicians,
        musician: MusicianQuery.musician
    })
});

var MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'List of every actions you can use on data.',
    fields: {
        addSong: SongMutation.add,
        destroySong: SongMutation.destroy,
    }
});


const Schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

export default Schema;
