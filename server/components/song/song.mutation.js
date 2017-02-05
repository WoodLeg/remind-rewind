import {
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import SongType from './song.type';


const MutationAdd = {
    type: SongType,
    description: 'Add a Song',
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
