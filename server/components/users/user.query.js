import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import User from './user.model';
import UserType from './user.type';

const promiseListAll = () => {
    return new Promise((resolve, reject) => {
        User.find((err, users) => {
            if (err) reject(err)
            else resolve(users)
        });
    });
};

const users = {
    type: new GraphQLList(UserType),
    resolve: (root) => {
        if (root.token.isAdmin) {
            return promiseListAll()
        } else {
            return new Promise((_, reject) => {
                reject("Not authorized");
            });
        }
    }
};

const user = {
    type: UserType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            User.findById(args.id, (err, user) => {
                if (err || !user) {
                    reject(err)
                }
                else {
                    resolve(user)
                }
            });
        });
    }
}

export default {
    users: users,
    user: user
}
