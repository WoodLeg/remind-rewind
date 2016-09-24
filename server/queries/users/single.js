import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} from 'graphql';


import UserType from '../../components/users/user.type';
import UserModel from '../../components/users/user.model';
import getProjection from '../../utils/projections';

export default {
    type: UserType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, args, options) {
        const projection = getProjection(options.fieldASTs[0]);
        return UserModel.findById(args.id).select(projection).exec();
    }
}
