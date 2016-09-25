import {
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema
} from 'graphql';

import UserQuery from './components/users/user.query';
import UserMutation from './components/users/user.mutation';


const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        users: UserQuery.users,
        user: UserQuery.user
    })
});

var MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        add: UserMutation.add,
        destroy: UserMutation.destroy,
    }
});


const Schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

export default Schema;
