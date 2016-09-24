import mongoose from 'mongoose';


const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    isAdmin: Boolean
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;
