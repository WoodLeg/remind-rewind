import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from 'graphql';

const EventType = new GraphQLObjectType({
    name: 'Event',
    description: 'Description of the Event type .',
    fields: () => ({
        type: {
            type: GraphQLString,
            description: 'Type of the performance.'
        },
        name: {
            type: GraphQLString,
            description: 'Width of the image.',
            resolve: ({displayName}) => {
                return displayName;
            }
        },
        location: {
            type: GraphQLString,
            description: 'City of the event.',
            resolve: ({location}) => {
                return location.city;
            }
        },
        room: {
            type:GraphQLString,
            description: 'Concert place.',
            resolve: ({venue}) => {
                return venue.displayName;
            }
        },
        date: {
            type: GraphQLString,
            description: 'Date of the event.',
            resolve: ({start}) => {
                return start.date;
            }
        },
        songkick: {
            type: GraphQLString,
            description: 'URL of the Event on Songkick',
            resolve: ({uri}) => {
                return uri;
            }
        }
    })
});

export default EventType;
