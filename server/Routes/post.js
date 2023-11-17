const express = require('express');
const { getFeedPosts, getUserPosts, likePost, addComment, getPostById, deletePost } = require('../controllers/post');
const { verifyToken } = require('../Middleware/auth');

const router = express.Router();

router.get('/', getFeedPosts); /*verifyToken,*/
router.get('/:userId/posts', getUserPosts);/*verifyToken,*/
router.get('/getPostById/:postId', getPostById)

// Update routes
router.patch('/:id/like', likePost); /*verifyToken,*/
router.post('/addComment/:postId', addComment); /*verifyToken,*/
router.delete('/deletePost/:postId', deletePost); /*verify*/

module.exports = router;