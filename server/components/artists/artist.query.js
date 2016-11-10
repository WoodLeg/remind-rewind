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
            ApiSpotify.searchArtist(args.name).then((response) => {
                resolve(response);
            }).catch((reason) => {
                reject(reason);
            });
        })
    }
};

const artists = {
    type: new GraphQLList(ArtistType),
    resolve: (_) => {
        return new Promise((resolve, reject) => {
            Artist.find({}, (err, artists) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(artists);
                }
            });
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
    resolve: (_, args) => {
        return new Promise((resolve, reject) => {
            ApiSpotify.getArtist(args.id).then((response) => {
                resolve(response);
            }).catch((reason) => {
                reject(reason);
            });
        })
    }
};

export default {
    searchArtist: searchArtist,
    artists: artists,
    artistDetail: artistDetail
}
