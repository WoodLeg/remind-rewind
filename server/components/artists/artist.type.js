import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList
} from 'graphql';

import ImageType from '../common/image.type';
import AlbumType from '../albums/albums.type';

import ApiSpotify from '../apis/spotify/spotify.service';

const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    description: 'Description of the Artist .',
    fields: () => ({
        name: {
            type: GraphQLString,
            description: 'Name of the artist/band in 7Digital'
        },
        id: {
            type: GraphQLString,
            description: 'ID of the artist/band Database'
        },
        spotify_id: {
            type: GraphQLString,
            description: 'ID of the artist/band to the 7Digital API.'
        },
        images: {
            type: new GraphQLList(ImageType),
            description: 'Image path provided by 7Digital'
        },
        albums: {
            type: new GraphQLList(AlbumType),
            description: 'Albums of the artist',
            resolve: ({id}) => {
                return ApiSpotify.getArtistAlbums(id);
            }
        }
    })
});

export default ArtistType;
