import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList
} from 'graphql';

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
        digital_id: {
            type: GraphQLString,
            description: 'ID of the artist/band to the 7Digital API.'
        }
    })
});

export default ArtistType;
