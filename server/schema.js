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
import ArtistQuery from './components/artists/artist.query';
import ArtistMutation from './components/artists/artist.mutation';

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'List of all data you can access.',
    fields: () => ({
        users: UserQuery.users,
        user: UserQuery.user,
        posts: PostQuery.posts,
        post: PostQuery.post,
        artist: ArtistQuery.searchArtist,
        artists: ArtistQuery.artists,
        artistDetail: ArtistQuery.artistDetail
    })
});

var MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'List of every actions you can use on data.',
    fields: {
        addUser: UserMutation.add,
        destroyUser: UserMutation.destroy,
        addPost: PostMutation.add,
        destroyPost: PostMutation.destroy,
        updateFeaturedPost: PostMutation.featured,
        addArtist: ArtistMutation.add,
        destroyArtist: ArtistMutation.destroy,
        updateFeatureArtist: ArtistMutation.updateFeatured
    }
});


const Schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

export default Schema;
