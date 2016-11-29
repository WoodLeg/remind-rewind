import mongoose from 'mongoose';


var UserSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    isAdmin: Boolean,
    isModerator: Boolean,
    password: String,
    facebookId: {type: String, unique: true},
    likes: [String],
    diggearRequest: Boolean
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;
