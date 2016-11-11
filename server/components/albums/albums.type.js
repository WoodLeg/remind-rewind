import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} from 'graphql';


import ArtistType from '../artists/artist.type';
import ImageType from '../common/image.type';

const AlbumType = new GraphQLObjectType({
    name: 'Album',
    description: 'Description of the Album type.',
    fields: () => ({
        artist: {
            type: new GraphQLList(ArtistType),
            description: 'Artist of the album.'
        },
        images: {
            type: new GraphQLList(ImageType),
            description: 'Image of the album.'
        },
        name: {
            type: GraphQLString,
            description: 'Name of the album.'
        },
        id: {
            type: GraphQLString,
            description: 'Spotify_ID of the album.'
        }
    })
});

export default AlbumType;
