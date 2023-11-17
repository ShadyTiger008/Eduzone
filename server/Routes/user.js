const express = require('express');

const router = express.Router();

const {
    getUser,
    getUserFriends,
    addRemoveFriend,
    updateTwitterHandle,
    updateLinkedinHandle,
    searchWithUserFullname,
    searchWithUsername,
    searchUser
} = require('../controllers/user');
const { verifyToken } = require('../Middleware/auth');

// Read routes
router.get('/:id', getUser); /*verifyToken,*/
router.get('/:id/frineds', getUserFriends); /*verifyToken,*/

// Search functionality
router.post('/searchUserByFullname', searchWithUserFullname);
router.post('/searchUserByUsername', searchWithUsername);
router.post('/searchUser', searchUser);

//Update routes
router.patch('/:id/:friendId', addRemoveFriend); /*verifyToken,*/

// Update User
router.post('/updateTwitterHandle/:userId', updateTwitterHandle);
router.post('/updateLinkedinHandle/:userId', updateLinkedinHandle);

module.exports = router;