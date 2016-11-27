import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList
} from 'graphql';

import PostType from '../posts/post.type';
import Post from '../posts/post.model';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Desfinition of the User Type.',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'ID of the User'
        },
        firstName: {
            type: GraphQLString,
            description: 'First name of the User'
        },
        lastName: {
            type: GraphQLString,
            description: 'Last name of the User'
        },
        email: {
            type: GraphQLString,
            description: 'Email of the User'
        },
        isAdmin: {
            type: GraphQLBoolean,
            description: 'Does the user is Admin ?'
        },
        isModerator: {
            type: GraphQLBoolean,
            descritpion: 'Does the user is Moderator ?'
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: ({id}) => {
                return new Promise((resolve, reject) => {
                    Post.find({'author': id}, (err, posts) => {
                        if (err || !posts) {
                            reject(err)
                        }
                        else {
                            resolve(posts)
                        }
                    });
                });
            }
        },
        likes: {
            type: new GraphQLList(GraphQLString),
            description: 'All postId that the user has liked'
        },
        diggearRequest: {
            type: GraphQLBoolean,
            description: 'User asked for becoming a diggear'
        }
    })
});

export default UserType;
