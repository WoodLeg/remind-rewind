import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt
} from 'graphql';

import UserType from '../users/user.type';
import User from '../users/user.model';

const PostType = new GraphQLObjectType({
    name: 'post',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'Id of the post'
        },
        title: {
            type: GraphQLString,
            description: 'Title of the post'
        },
        content: {
            type: GraphQLString,
            description: 'Content of the post'
        },
        author: {
            type: UserType,
            resolve: ({id}) => {
                return new Promise((resolve, reject) => {
                    User.findById(id, (err, user) => {
                        console.log(err);
                        console.log(user);
                        if (err || !user) {
                            reject(err)
                        }
                        else {
                            resolve(user)
                        }
                    });
                });
            },
            description: 'Author of the post'
        },
        likes: {
            type: GraphQLInt,
            description: 'Number of Likes of the post'
        },
        artist: {
            type: GraphQLString,
            description: 'Artist involved in the post'
        },
        date: {
            type: GraphQLString,
            description: 'Date of publication'
        }
    })
});

export default PostType;
