import mongoose from 'mongoose';

const UserModel = mongoose.model('users', {
    id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    isAdmin: Boolean,
    isModerator: Boolean,
    password: String
});

export default UserModel;
