// import mongoose from "mongoose";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: {
        type: 'String',
        required: true,
        min: 2,
        max: 50,
    },
    userName: {
        type: 'String',
        required: true,
        min: 2,
        max: 50,
    },
    friends: {
        type: 'Array',
        default: [],
    },
    email: {
        type: 'String',
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: 'String',
        required: true,
        min: 8,
    },
    picturePath: {
        type: 'String',
        default: "",
    },
    location: {
        type: 'String',
    },
    occupation: {
        type: 'String',
    },
    viewedProfile: {
        type: 'Number',
    },
    impressions: {
        type: 'Number',
    },
    twitterHandle: {
        type: 'String',
        default: null,
    },
    linkedinHandle: {
        type: 'String',
        default: null,
    }
}, {
    timestamps: true,
})

const User = mongoose.model('User', UserSchema, 'User');

module.exports = User;