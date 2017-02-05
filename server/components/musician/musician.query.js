import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import MusicianType from './musician.type';

const promiseListAll = () => {
    return new Promise((resolve, reject) => {
        let musicianss = [{
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
            instrumeny: 'Drums'
        }];
        resolve(musicianss);
    });
};

const musicianss = {
    type: new GraphQLList(MusicianType),
    resolve: () => {
        return promiseListAll()
    }
};

const musician = {
    type: MusicianType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            let musician = {
                id: '1',
                firstName: 'Clément',
                lastName: 'Freymond',
                instrument: 'Guitar'
            };
            resolve(musician);
        });
    }
}

export default {
    musicians: musicianss,
    musician: musician
}
