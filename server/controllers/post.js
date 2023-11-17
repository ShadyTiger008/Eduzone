const express = require('express');
const Post = require('../Models/Post');
const User = require('../Models/User');

const createPost = async (req, res) => {
   try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            fullName: user.fullName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        })
       await newPost.save();

       const post = await Post.find();
       res.status(201).json(post)
   } catch (error) {
        res.status(409).json({message: error.message})
   }
}

// Read
const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(201).json(post)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({userId});
        res.status(201).json(post)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
} 

// Update
const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        res.status(201).json(updatedPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, comment } = req.body;
        const post = await Post.findById(postId);
        if (post) {
            const updatedPost = await Post.findByIdAndUpdate(
                postId,
                {
                    $push: {
                        comments: {
                            userId: userId,
                            comment: comment,
                        },
                    },
                },
                { new: true }
            );

            res.status(201).json({
                message: 'Successfully added comment to post!',
                post: updatedPost,
            });
        } else {
            res.status(404).json({
                message: 'Post not found',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error while adding comment',
            error: error.message,
        });
    }
};

const getPostById = async (req, res) => {
   try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({
            message: 'Post not found!'
        })
    }
   } catch (error) {
    res.status(500).json(error)
   }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        
        if (post) {
            await Post.findByIdAndDelete(postId);
            const allPosts = await Post.find();
            res.status(200).json(allPosts);
        } else {
            res.status(404).json({ message: 'Post not found!' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

    
module.exports = { getFeedPosts, getUserPosts, likePost, createPost, addComment, getPostById, deletePost }