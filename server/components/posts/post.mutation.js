import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} from 'graphql';

import PostType from './post.type';
import UserType from '../users/user.type';
import Post from './post.model';


const MutationAdd = {
    type: PostType,
    description: 'Add a Post',
    args: {
        title: {
            name: 'Title',
            type: new GraphQLNonNull(GraphQLString),
            description: 'Title of the post'
        },
        content: {
            name: 'Content',
            type: new GraphQLNonNull(GraphQLString),
            description: 'Content of the post'
        },
        author: {
            name: 'Author',
            type: new GraphQLNonNull(GraphQLString),
            description: 'ID of the author'
        },
        artist: {
            name: 'Artist',
            type: new GraphQLNonNull(GraphQLString),
            description: 'Name of the artist'
        },
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            let newPost = new Post({
                title: args.title,
                content: args.content,
                author: args.author,
                likes: 0,
                artist: args.artist,
                date: new Date()
            });
            newPost.id = newPost._id;
            newPost.save(function (err, post) {
                if (err) reject(err);
                else resolve(post);
            });
        });
    }
};

const MutationDestroy = {
    type: PostType,
    description: 'Delete the post',
    args: {
        id: {
            name: 'Post Id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            Post.findById(args.id, (err, post) => {
                if (err) {
                    reject(err);
                } else if (!post) {
                    reject('Post NOT found');
                } else {
                    post.remove((err) => {
                        if (err) reject(err);
                        else resolve(post);
                    });
                }
            });
        });
    }
};

export default {
    add: MutationAdd,
    destroy: MutationDestroy
}
