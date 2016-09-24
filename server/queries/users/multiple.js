import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} from 'graphql';

import UserType from '../../components/users/user.type';
import UserModel from '../../components/users/user.model';
import getProjection from '../../utils/projections';

export default {
    type: new GraphQLList(UserType),
    args: {},
    resolve(root, args, options) {
        const projection = getProjection(options.fieldASTs[0]);
        return UserModel.find().select(projection).exec();
    }
}
