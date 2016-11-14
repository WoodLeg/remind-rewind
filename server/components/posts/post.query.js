import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} from 'graphql';

import Post from './post.model';
import PostType from './post.type';

const promiseListAll = (admin) => {
    return new Promise((resolve, reject) => {
        if (admin) {
            Post.find((err, posts) => {
                if (err) reject(err)
                else resolve(posts)
            });
        } else {
            Post.find({'online': true}).sort({'date': -1}).exec().then((posts) => {
                resolve(posts);
            }).catch((err) => {
                reject(err);
            });
        }
    });
};

const posts = {
    type: new GraphQLList(PostType),
    args: {
        admin: {
            name: 'Query all posts',
            type: GraphQLBoolean
        }
    },
    resolve: (root, args) => {
        root.token = {};
        if (root.token) {
            return promiseListAll(args.admin)
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
