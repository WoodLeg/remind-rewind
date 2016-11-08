import mongoose from 'mongoose';


var UserSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    isAdmin: Boolean,
    isModerator: Boolean,
    password: String
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;
