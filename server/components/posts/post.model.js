import mongoose from 'mongoose';

import User from '../users/user.model.js';


const PostModel = mongoose.model('posts', {
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    author: User.schema,
    likes: Number,
    artist: String,
    date: Date
});

export default PostModel;
