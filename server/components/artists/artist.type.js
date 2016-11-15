import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList
} from 'graphql';

import ImageType from '../common/image.type';
import AlbumType from '../albums/albums.type';
import EventType from '../common/event.type';

import Artist from '../artists/artist.model';

import ApiSpotify from '../apis/spotify/spotify.service';
import ApiSongkick from '../apis/songkick/songkick.service';

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
            description: 'ID of the artist/band to the Spotify API.'
        },
        featured: {
            type: GraphQLBoolean,
            description: 'Status of the artist'
        },
        images: {
            type: new GraphQLList(ImageType),
            description: 'Image path provided by 7Digital'
        },
        songkick_id: {
            type: GraphQLString,
            description: 'ID of the artist/band on the Songkick API'
        },
        albums: {
            type: new GraphQLList(AlbumType),
            description: 'Albums of the artist',
            resolve: ({id}) => {
                return ApiSpotify.getArtistAlbums(id);
            }
        },
        events: {
            type: new GraphQLList(EventType),
            description: 'Events associated to the Artist',
            resolve: ({id}) => {
                return new Promise((resolve, reject) => {
                    Artist.findOne({'spotify_id': id}, (err, value) => {
                        if (err) reject(err);
                        ApiSongkick.getEvents(value.songkick_id).then((events) => {
                            resolve(events.resultsPage.results.event);
                        }).catch((reason) => {
                            reject(reason);
                        });
                    });
                });
            }
        }
    })
});

export default ArtistType;
