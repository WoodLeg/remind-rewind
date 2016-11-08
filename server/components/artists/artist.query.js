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
}

const artists = {
    type: new GraphQLList(ArtistType),
    resolve: (_) => {
        return new Promise((resolve, reject) => {
            Artist.find({}, function(err, artists){
                if (err) {
                    reject(err);
                } else {
                    resolve(artists);
                }
            });
        })
    }
}

export default {
    searchArtist: searchArtist,
    artists: artists
}
