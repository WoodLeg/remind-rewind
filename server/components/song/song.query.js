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
            url: 'http://www.remind-rewind.com/trololol/half_time_crap.mp3',
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
        resolve(songs);
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
                url: 'http://www.remind-rewind.com/trololol/half_time_crap.mp3',
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
