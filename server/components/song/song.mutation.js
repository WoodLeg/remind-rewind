import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} from 'graphql';

import SongType from './song.type';

const MutationAdd = {
    type: SongType,
    description: 'Add a Song',
    args: {
        facebookId: {
            type: 'Facebook ID',
            type: GraphQLString,
            description: 'Facebook ID of the user'
        },
        firstName: {
            name: 'First name',
            type: GraphQLString,
            description: 'First name of the User.'
        },
        lastName: {
            name: 'Last name',
            type: GraphQLString,
            description: 'Last name of the User.'
        },
        email: {
            name: 'email',
            type: GraphQLString,
            description: 'Email of the User'
        },
        password: {
            name: 'password',
            type: GraphQLString,
            description: 'Password of the User.'
        },
        isAdmin: {
            name: 'isAdmin',
            type: GraphQLBoolean,
            description: 'Does the user is an Admin ?'
        },
        isModerator: {
            name: 'isModerator',
            type: GraphQLBoolean,
            description: 'Does the user is a Moderator ?'
        }
    },
    resolve: (root, args) => {
        let newSong = new Song({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email
        });
        newSong.id = newSong._id;
        return new Promise((resolve, reject) => {
            newSong.save(function (err, user) {
                if (err) reject(err)
                else resolve(user)
            })
        });
    }
};

const MutationDestroy = {
    type: SongType,
    description: 'Delete the user',
    args: {
        id: {
            name: 'Song Id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            Song.findById(args.id, (err, user) => {
                if (err) {
                    reject(err);
                } else if (!user) {
                    reject('User NOT found');
                } else {
                    user.remove((err) => {
                        if (err) reject(err);
                        else resolve(user);
                    });
                }
            });
        });
    }
};

const MutationPromoteUser = {
    type: UserType,
    description: 'Promote a user',
    args: {
        id: {
            name: 'User id',
            type: new GraphQLNonNull(GraphQLString)
        },
        isModerator: {
            name: 'Moderator value',
            type: new GraphQLNonNull(GraphQLBoolean)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            if (root.token.isAdmin){
                User.findById(args.id, (err, user) => {
                    if (err) {
                        reject(err);
                    } else if (!user) {
                        reject('User not found');
                    } else {
                        user.isModerator = args.isModerator;
                        user.save((err, updatedUser) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(updatedUser);
                            }
                        });
                    }
                });
            } else {
                reject('Not authorized');
            }
        })
    }
}

const MutationDiggearRequest = {
    type: UserType,
    description: 'Request of a user to become a diggear',
    args: {
        id: {
            name: 'User ID',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            User.findById(args.id).exec().then((user) => {
                user.diggearRequest = true;
                user.save((err, userSaved) => {
                    if (err) reject(err);
                    else resolve(userSaved);
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

export default {
    add: MutationAdd,
    destroy: MutationDestroy,
    promoteUser: MutationPromoteUser,
    diggearRequest: MutationDiggearRequest
}
