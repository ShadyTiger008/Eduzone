const User = require('../Models/User');

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({
            user: user
        })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
}
    
const getUserFriends = async (req, res) => {
   try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friend = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friend.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return {
                _id, firstName, lastName, occupation, location, picturePath
            };
        })
       res.status(200).json(formattedFriends)
   } catch (error) {
       res.status(404).json({message: error.message});
   }
}

// Update friendlist
const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    // Check the existence of users and validation of IDs before modifying friend lists
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((friend) => friend !== friendId);
      friend.friends = friend.friends.filter((u) => u !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const formattedFriends = await Promise.all(
      user.friends.map((id) => User.findById(id, 'fullName occupation location picturePath'))
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTwitterHandle = async (req, res) => {
    try {
      const { twitterHandle } = req.body;
      console.log(twitterHandle);
        const { userId } = req.params;
        console.log("User Id: ", userId);
      
        const user = await User.findById(userId);

        if (user) {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { twitterHandle: twitterHandle },
                { new: true } // To return the updated document
            );

            return res.status(200).json({ updatedUser }); // Moved inside the 'if' block
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateLinkedinHandle = async (req, res) => {
  try {
    const { userId } = req.params;
    const { linkedinHandle } = req.body;
    const user = await User.findById(userId);
    if (user) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { linkedinHandle: linkedinHandle },
        { new: true }
      )
      res.status(201).json(updatedUser);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const searchWithUserFullname = async (req, res) => {
  try {
    const { userFullname } = req.body;
    const searchedUser = await User.find({ fullName: userFullname });
    const userGot = searchedUser.map((user) => {
      return user;
    })
    res.status(200).json({
      message: 'User found successfully!',
      user: userGot
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const searchWithUsername = async (req, res) => {
  try {
    const { userUsername } = req.body;
    const searchedUser = await User.find({ userName: userUsername });
    res.status(200).json({
      message: 'User found successfully!',
      user: searchedUser
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const searchUser = async (req, res) => {
  try {
    const { userInput } = req.body;

    const byFullName = await User.find({ fullName: userInput });

    const byUsername = await User.find({ userName: userInput });

    const users = [...byFullName, ...byUsername];

    res.status(200).json({
      message: 'Users found successfully!',
      users,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


module.exports = {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateTwitterHandle,
  updateLinkedinHandle,
  searchWithUserFullname,
  searchWithUsername,
  searchUser
};