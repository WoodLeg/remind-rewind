import {
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema
} from 'graphql';

import mongoose from 'mongoose';

const UserModel = mongoose.model('users', {
    id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    isAdmin: Boolean
});


const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        isAdmin: {
            type: GraphQLBoolean
        }
    })
});

const promiseListAll = () => {
    return new Promise((resolve, reject) => {
        UserModel.find((err, users) => {
            if (err) reject(err)
            else resolve(users)
        });
    });
};

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve: () => {
                return promiseListAll()
            }
        },
        user: {
            type: UserType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (root, args) => {
                return new Promise((resolve, reject) => {
                    UserModel.findById(args.id, (err, user) => {
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
    })
});

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
        let newUser = new UserModel({
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

const MutationDelete = {
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
            UserModel.findById(args.id, (err, user) => {
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


var MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        add: MutationAdd,
        destroy: MutationDelete,
    }
});


const Schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

export default Schema;
