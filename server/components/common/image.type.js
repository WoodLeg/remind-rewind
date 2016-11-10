import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from 'graphql';

const ImageType = new GraphQLObjectType({
    name: 'Image',
    description: 'Description of the Image type .',
    fields: () => ({
        url: {
            type: GraphQLString,
            description: 'URL where the image is stored.'
        },
        width: {
            type: GraphQLInt,
            description: 'Width of the image.'
        },
        height: {
            type: GraphQLInt,
            description: 'Height of the image.'
        }
    })
});

export default ImageType;
