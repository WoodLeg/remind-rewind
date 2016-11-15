import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import ApiDigital from '../apis/7digital/7digital.service';
import ApiSpotify from '../apis/spotify/spotify.service';

import ArtistType from './artist.type';
import Artist from './artist.model';

const searchArtist = {
    type: new GraphQLList(ArtistType),
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            if (root.token.isAdmin || root.token.isModerator){
                ApiSpotify.searchArtist(args.name).then((response) => {
                    resolve(response);
                }).catch((reason) => {
                    reject(reason);
                });
            } else {
                reject('Not Authorized');
            }
        })
    }
};

const artists = {
    type: new GraphQLList(ArtistType),
    resolve: (root) => {
        return new Promise((resolve, reject) => {
            if (root.token.isAdmin || root.token.isModerator){
                Artist.find({}, (err, artists) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(artists);
                    }
                });
            } else {
                reject('Not Authorized');
            }
        })
    }
};

const artistDetail = {
    type: ArtistType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        if (root.token.isAdmin || root.token.isModerator) {
            return ApiSpotify.getArtist(args.id);
        } else {
            return new Promise((_, reject) => reject('Not Authorized'));
        }
    }
};

export default {
    searchArtist: searchArtist,
    artists: artists,
    artistDetail: artistDetail
}
