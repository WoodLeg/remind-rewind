import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import AlbumType from './albums.type';


import ApiSpotify from '../apis/spotify/spotify.service';

const album = {
    type: AlbumType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return ApiSpotify.getAlbum(args.id).then((response) => {
            return response.albums[0];
        });
    }
};

export default {
    album: album
}
