import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';

import queries from './queries';

const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: queries
    })
    // mutations: new GraphQLSchema({
    //     name: 'mutation',
    //     fields: mutations
    // })
});

export default Schema;
