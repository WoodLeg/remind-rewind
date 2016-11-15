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
        featured : {
            name: 'Featured',
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        online: {
            name: 'Online',
            type: new GraphQLNonNull(GraphQLBoolean)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            if(root.token.isAdmin || root.token.isModerator){
                let newPost = new Post({
                    title: args.title,
                    content: args.content,
                    author: args.author,
                    likes: 0,
                    artist: args.artist,
                    date: new Date(),
                    featured: args.featured,
                    online: args.online
                });
                newPost.id = newPost._id;
                newPost.save(function (err, post) {
                    if (err) reject(err);
                    else resolve(post);
                });
            } else {
                reject('Not authorized');
            }
        });
    }
};

const MutationEdit = {
    type: PostType,
    description: 'Edit a Post',
    args: {
        id: {
            name: 'ID',
            type: new GraphQLNonNull(GraphQLString),
            description: 'ID of the post to update'
        },
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
        artist: {
            name: 'Artist',
            type: new GraphQLNonNull(GraphQLString),
            description: 'Name of the artist'
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            if (root.token.isAdmin || root.token.isModerator){
                Post.findById(args.id, (err, value) => {
                    if (err) {
                        reject(err);
                    } else if (!value){
                        reject('Post not found')
                    } else {
                        value.title = args.title;
                        value.content = args.content;
                        value.artist = args.artist;
                        value.save((err, post) => {
                            if (err) reject(err);
                            else resolve(post);
                        });
                    }
                });
            } else {
                reject('Not authorized');
            }
        });
    }
};


const MutationFeatured = {
    type: PostType,
    description: 'Update a post into a featured one',
    args: {
        id: {
            type: GraphQLString,
            description: 'ID of the post to update'
        },
        featured: {
            type: GraphQLBoolean,
            description: 'Featured value of the post'
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            if (root.token.isAdmin || root.token.isModerator){
                Post.findById(args.id, (err, post) => {
                    if (err) {
                        reject(err);
                    } else if (!post){
                        reject('Post not found')
                    } else {
                        post.featured = args.featured;
                        post.save((err, newPost) => {
                            if (err) reject(err);
                            else resolve(newPost)
                        });
                    }
                })
            } else {
                reject('Not authorized');
            }
        })
    }
}

const MutationOnline = {
    type: PostType,
    description: 'Update a post into a published one',
    args: {
        id: {
            type: GraphQLString,
            description: 'ID of the post to update'
        },
        online: {
            type: GraphQLBoolean,
            description: 'Online value of the post'
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            if (root.token.isAdmin || root.token.isModerator) {
                Post.findById(args.id, (err, post) => {
                    if (err) {
                        reject(err);
                    } else if (!post){
                        reject('Post not found')
                    } else {
                        post.online = args.online;
                        post.save((err, newPost) => {
                            if (err) reject(err);
                            else resolve(newPost)
                        });
                    }
                })
            } else {
                reject('Not Authorized');
            }
        })
    }
}


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
            if (root.token.isAdmin || root.token.isModerator) {
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
            } else {
                reject('Not Authorized');
            }
        });
    }
};

export default {
    add: MutationAdd,
    destroy: MutationDestroy,
    featured: MutationFeatured,
    onlined: MutationOnline,
    edit: MutationEdit
}
