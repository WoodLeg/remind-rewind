import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLList
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
            type: new GraphQLList(GraphQLString),
            description: 'IDs of every user who liked the post'
        },
        artist: {
            type: ArtistType,
            description: 'Artist involved in the post',
            args: {
                admin: {
                    type :GraphQLBoolean
                }
            },
            resolve: ({artist}, args) => {
                if (args.admin){
                    return Artist.find({'spotify_id': artist}).exec().then((response) => {
                        return response[0];
                    });
                } else {
                    return ApiSpotify.getArtist(artist);
                }
            }
        },
        date: {
            type: GraphQLString,
            description: 'Date of publication'
        },
        featured: {
            type: GraphQLBoolean,
            description: 'Featured post'
        },
        online: {
            type: GraphQLBoolean,
            description: 'Published article'
        }
    })
});

export default PostType;
