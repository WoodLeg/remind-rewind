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
import PostQuery from './components/posts/post.query';
import PostMutation from './components/posts/post.mutation';

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        users: UserQuery.users,
        user: UserQuery.user,
        posts: PostQuery.posts,
        post: PostQuery.post
    })
});

var MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: UserMutation.add,
        destroyUser: UserMutation.destroy,
        addPost: PostMutation.add,
        destroyPost: PostMutation.destroy
    }
});


const Schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

export default Schema;
