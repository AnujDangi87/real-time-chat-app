import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try
    {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUser);
    }
    catch(error)
    {
        console.log("Error in getUsersForSidebar", error);
        res.status(500).json({error: "Internal server error"});
    }
};

export const getMessages = async (req, res) => {
    try
    {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        });

        res.status(200).json(messages);
    }
    catch(error)
    {
        console.log("Error in getMessage controller", error.message);
        res.status(500).josn({error: "Internal server error"});
    }
}