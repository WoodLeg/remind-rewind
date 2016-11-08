import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import Post from './post.model';
import PostType from './post.type';

const promiseListAll = () => {
    return new Promise((resolve, reject) => {
        Post.find((err, posts) => {
            if (err) reject(err)
            else resolve(posts)
        });
    });
};

const posts = {
    type: new GraphQLList(PostType),
    resolve: (root) => {
        root.token = {};
        if (root.token) {
            return promiseListAll()
        } else {
            return new Promise((resolve, reject) => {
                reject("Not authorized");
            });
        }
    }
};

const post = {
    type: PostType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            Post.findById(args.id, (err, post) => {
                if (err || !post) {
                    reject(err)
                }
                else {
                    resolve(post)
                }
            });
        });
    }
}

export default {
    posts: posts,
    post: post
}
