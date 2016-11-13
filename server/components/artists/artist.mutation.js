import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean
} from 'graphql';

import ArtistType from './artist.type';
import Artist from './artist.model';
import ApiSongkick from '../apis/songkick/songkick.service';

const MutationAdd = {
    type: ArtistType,
    description: 'Add a Artist',
    args: {
        spotify_id: {
            name: '7Digital ID',
            type: new GraphQLNonNull(GraphQLID),
            description: 'ID of the 7Digital API.'
        },
        name: {
            name: 'Name of the artist/band',
            type: new GraphQLNonNull(GraphQLString),
            description: 'Name of the artist/band.'
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            let newArtist = new Artist({
                id: args.digital_id,
                spotify_id: args.spotify_id,
                name: args.name
            });
            ApiSongkick.searchArtist(args.name).then((value) => {
                newArtist.songkick_id = value.resultsPage.results.artist[0].id;
            }).finally(() => {
                newArtist.save(function(err, artist){
                    if (err) {
                        reject(err)
                    } else {
                        resolve(artist);
                    }
                });
            });
        });
    }
};

const MutationFeatured = {
    type: ArtistType,
    description: 'Update artist/band informations',
    args: {
        id: {
            name: "Id of the Artist",
            type: GraphQLString
        },
        featured: {
            name: 'Artist Object',
            type: GraphQLBoolean
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            Artist.findById(args.id, (err, artist) => {
                if (err) {
                    reject(err);
                } else if (!artist){
                    reject('Artist not found');
                } else {
                    artist.featured = args.featured;
                    artist.save((err) => {
                        if (err) reject(err);
                        else resolve(artist);
                    });
                }
            })
        })
    }
};

const MutationDestroy = {
    type: ArtistType,
    description: 'Delete the user',
    args: {
        id: {
            name: 'Artist Id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            Artist.findById(args.id, (err, artist) => {
                if (err) {
                    reject(err);
                } else if (!artist) {
                    reject('Artist NOT found');
                } else {
                    artist.remove((err) => {
                        if (err) reject(err);
                        else resolve(artist);
                    });
                }
            });
        });
    }
};

export default {
    add: MutationAdd,
    destroy: MutationDestroy,
    updateFeatured: MutationFeatured
}
