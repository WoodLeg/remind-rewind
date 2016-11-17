import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} from 'graphql';

import ArtistType from '../artists/artist.type';

const TrackType = new GraphQLObjectType({
    name: 'Track',
    description: 'Description of the Album type.',
    fields: () => ({
        artists: {
            type: new GraphQLList(ArtistType),
            description: 'Artist of the album.'
        },
        id: {
            type: GraphQLString,
            description: 'Spotify_ID of the album.'
        },
        track_number: {
            type: GraphQLInt,
            description: "Number of the track on the album."
        },
        duration: {
            type: GraphQLInt,
            description: "Duration of the track.",
            resolve: (root) => {
                return root.duration_ms;
            }
        },
        name: {
            type: GraphQLString,
            description: "Name of the Track"
        }
    })
});

export default TrackType;
