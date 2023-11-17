const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    picturePath: {
        type: String,
        default: "",
    },
    userPicturePath: {
        type: String,
        default: "",
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: [
        {
            userId: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 500,
            },
        },
    ],
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema, 'Post');

module.exports = Post;
