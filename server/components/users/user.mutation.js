import {
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import UserType from './user.type';
import User from './user.model';



const MutationAdd = {
    type: UserType,
    description: 'Add a User',
    args: {
        firstName: {
            name: 'First name',
            type: new GraphQLNonNull(GraphQLString)
        },
        lastName: {
            name: 'Last name',
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            name: 'email',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        let newUser = new User({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email
        });
        newUser.id = newUser._id;
        return new Promise((resolve, reject) => {
            newUser.save(function (err, user) {
                if (err) reject(err)
                else resolve(user)
            })
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
                    reject(err)
                } else if (!user) {
                    reject('Todo NOT found')
                } else {
                    user.remove((err) => {
                        if (err) reject(err)
                        else resolve(user)
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
