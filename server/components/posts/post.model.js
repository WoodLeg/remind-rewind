import mongoose from 'mongoose';

import User from '../users/user.model.js';


const PostModel = mongoose.model('posts', {
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    author: String,
    likes: [String],
    artist: String,
    date: Date,
    featured: Boolean,
    online: Boolean
});

export default PostModel;
