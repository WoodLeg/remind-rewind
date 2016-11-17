import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} from 'graphql';


import ArtistType from '../artists/artist.type';
import ImageType from '../common/image.type';
import TrackType from '../tracks/tracks.type';

const AlbumType = new GraphQLObjectType({
    name: 'Album',
    description: 'Description of the Album type.',
    fields: () => ({
        artists: {
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
        },
        release_date: {
            type: GraphQLString,
            description: 'Release date of the album'
        },
        label: {
            type: GraphQLString,
            description: 'Label of the album'
        },
        tracks: {
            type: new GraphQLList(TrackType),
            description: 'Tracks of the album',
            resolve:(root) => {
                console.log(root.tracks.items);
                return root.tracks.items;
            }
        }
    })
});

export default AlbumType;
