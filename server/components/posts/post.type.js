import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt
} from 'graphql';

import UserType from '../users/user.type';
import User from '../users/user.model';
import ArtistType from '../artists/artist.type';
import Artist from '../artists/artist.model';

import ApiSpotify from '../apis/spotify/spotify.service';

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Definition of the Post Type.',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'Id of the post'
        },
        title: {
            type: GraphQLString,
            description: 'Title of the post'
        },
        content: {
            type: GraphQLString,
            description: 'Content of the post'
        },
        author: {
            type: UserType,
            resolve: ({author}) => {
                return User.findById(author).exec();
            },
            description: 'Author of the post'
        },
        likes: {
            type: GraphQLInt,
            description: 'Number of Likes of the post'
        },
        artist: {
            type: ArtistType,
            description: 'Artist involved in the post',
            resolve: ({artist}) => {
                return Artist.findById(artist).exec().then((value) => {
                    return ApiSpotify.getArtist(value.spotify_id);
                });
            }
        },
        date: {
            type: GraphQLString,
            description: 'Date of publication'
        },
        featured: {
            type: GraphQLBoolean,
            description: 'Featured post'
        }
    })
});

export default PostType;
