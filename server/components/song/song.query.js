import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import SongType from './song.type';

const promiseListAll = () => {
    return new Promise((resolve, reject) => {
        let songs = [{
            id: '1',
            name: 'Half Time Crap',
            url: 'http://remind-rewind.com/music/2.wav',
            musicians: [{
                id: '1',
                firstName: 'Clément',
                lastName: 'Freymond',
                instrument: 'Guitar'
            }, {
                id: '2',
                firstName: 'Henry',
                lastName: 'XXX',
                instrument: 'Bass'
            }, {
                id: '3',
                firstName: 'Paul',
                lastName: 'Souvestre',
                instrument: 'Drums'
            }]
        }, {
            id: '2',
            name: 'Floydy Poopy',
            url: 'http://remind-rewind.com/music/2.wav',
            musicians: [{
                id: '1',
                firstName: 'Clément',
                lastName: 'Freymond',
                instrument: 'Guitar'
            }, {
                id: '2',
                firstName: 'Henry',
                lastName: 'XXX',
                instrument: 'Bass'
            }, {
                id: '3',
                firstName: 'Paul',
                lastName: 'Souvestre',
                instrument: 'Drums'
            }]
        }, {
            id: '2',
            name: 'Shitty Things Happens',
            url: 'http://remind-rewind.com/music/2.wav',
            musicians: [{
                id: '1',
                firstName: 'Clément',
                lastName: 'Freymond',
                instrument: 'Guitar'
            }, {
                id: '2',
                firstName: 'Henry',
                lastName: 'XXX',
                instrument: 'Bass'
            }, {
                id: '3',
                firstName: 'Paul',
                lastName: 'Souvestre',
                instrument: 'Drums'
            }]
        }];
        setTimeout(() => {
            resolve(songs);
        }, 3000);
    });
};

const songs = {
    type: new GraphQLList(SongType),
    resolve: () => {
        return promiseListAll()
    }
};

const song = {
    type: SongType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            let song = {
                id: '1',
                name: 'Half Time Crap',
                url: 'http://remind-rewind.com/music/2.wav',
                musicians: [{
                    id: '1',
                    firstName: 'Clément',
                    lastName: 'Freymond',
                    instrument: 'Guitar'
                }, {
                    id: '2',
                    firstName: 'Henry',
                    lastName: 'XXX',
                    instrument: 'Bass'
                }, {
                    id: '3',
                    firstName: 'Paul',
                    lastName: 'Souvestre',
                    instrument: 'Drums'
                }]
            };
            resolve(song);
        });
    }
}

export default {
    songs: songs,
    song: song
}
