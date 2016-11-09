import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import ApiDigital from '../7digital/7digital.service';

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
            ApiDigital.searchArtist(args.name).then((response) => {
                if(response.searchResults.searchResult.length === 0){
                    reject('Artist not found');
                } else {
                    let artists = [];

                    for (var i = 0; i < response.searchResults.searchResult.length; i++) {
                        artists.push(response.searchResults.searchResult[i].artist);
                    }
                    resolve(artists);
                }
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
            ApiDigital.artistDetail(args.id).then((response) => {
                console.log('SUCCESS GET ARTIST DETAIL: ', response);
                resolve(response.artist);
            }).catch((reason) =>{
                reject(reason);
                console.log('FAILED GET ARTIST DETAIL: ', reason);
            });
        })
    }
};

export default {
    searchArtist: searchArtist,
    artists: artists,
    artistDetail: artistDetail
}
