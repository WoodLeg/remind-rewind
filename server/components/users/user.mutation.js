import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} from 'graphql';

import UserType from './user.type';
import User from './user.model';
import bcrypt from 'bcrypt';

const MutationAdd = {
    type: UserType,
    description: 'Add a User',
    args: {
        firstName: {
            name: 'First name',
            type: new GraphQLNonNull(GraphQLString),
            description: 'First name of the User.'
        },
        lastName: {
            name: 'Last name',
            type: new GraphQLNonNull(GraphQLString),
            description: 'Last name of the User.'
        },
        email: {
            name: 'email',
            type: new GraphQLNonNull(GraphQLString),
            description: 'Email of the User'
        },
        password: {
            name: 'password',
            type: new GraphQLNonNull(GraphQLString),
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
        return new Promise((resolve, reject) => {
            bcrypt.hash(args.password, 10, function(err, hash){
                if (err){
                    reject(err);
                } else {
                    let newUser = new User({
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email,
                        password: hash,
                        isAdmin: args.isAdmin,
                        isModerator: args.isModerator
                    });
                    newUser.id = newUser._id;
                    newUser.save(function (err, user) {
                        if (err) reject(err);
                        else resolve(user);
                    });
                }
            });
        });
    }
};

const MutationDestroy = {
    type: UserType,
    description: 'Delete the user',
    args: {
        id: {
            name: 'User Id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            User.findById(args.id, (err, user) => {
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

export default {
    add: MutationAdd,
    destroy: MutationDestroy
}
