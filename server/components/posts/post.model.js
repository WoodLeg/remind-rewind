import mongoose from 'mongoose';

import User from '../users/user.model.js';


const PostModel = mongoose.model('posts', {
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    author: String,
    likes: Number,
    artist: String,
    date: Date,
    featured: Boolean
});

export default PostModel;
