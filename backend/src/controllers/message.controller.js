import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try
    {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.
    }
    catch(error)
    {
        console.log("Error in message controller", error);
        res.status(500).json({message: })
    }
};