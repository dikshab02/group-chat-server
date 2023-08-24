const chatGroupCollection = require("mongoose").model("ChatGroupCollection");
module.exports = {
  createChatGroup: (req, res) => {
    //api to save chat group
    try {
      const chatGroup = req.body.chatGroup;
      chatGroupCollection
        .insertMany([chatGroup])
        .then(() => {
          res.send({
            isError: false,
            message: "Chat group created",
            data: "",
          });
        })
        .catch((error) => {
          res.status(500).json({
            isError: true,
            message: "Chat group not created",
            data: error.message,
          });
        });
    } catch (error) {
      res.status(500).json({
        isError: true,
        message: "Internal server error",
        data: error.message,
      });
    }
  },
  updateChatGroup: (req, res) => {
    //api to update chat group
    const groupId = req.params.groupId;
    const chatgroup = req.body.chatGroup;
    try {
      chatGroupCollection
        .findById(groupId)
        .then((group) => {
          if (group) {
            group.name = chatgroup.name;
            group.users = chatgroup.users;
            group.save();
            res.send({
              isError: false,
              message: "Group updated",
              data: "",
            });
          } else {
            res.status(400).json({
              isError: true,
              message: "Group not found",
              data: "",
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            isError: true,
            message: "Failed to execute query",
            data: error.message,
          });
        });
    } catch (error) {
      res.status(500).json({
        isError: true,
        message: "Internal server error",
        data: error.message,
      });
    }
  },
  getAll: (req, res) => { //get all chat groups for a given user
    const userId = req.params.userId;
    try {
      chatGroupCollection
        .find({ "users._id": userId })
        .then((groups) => {
          res.send({
            isError: false,
            message: "",
            data: groups,
          });
        })
        .catch((error) => {
          res.status(500).json({
            isError: true,
            message: "failed to get chat groups for a given user",
            data: error.message,
          });
        });
    } catch (error) {
      res.status(500).json({
        isError: true,
        message: "Internal server error",
        data: error.message,
      });
    }
  },
  leaveGroup: (req, res) => {  //api to leave group
    const groupId = req.params.groupId;
    const userId = req.params.userId;
    try {
      chatGroupCollection
        .findById(groupId)
        .then((group) => {
          if (!group)
            return res.status(404).json({
              isError: true,
              message: "Group not found",
              data: "",
            });

          const userIndex = group.users.findIndex(
            (user) => user._id.toString() === userId
          );
          if (userIndex === -1) {
            return res.status(404).json({
              isError: true,
              message: "User not found in the group",
              data: "",
            });
          }
          group.users.splice(userIndex, 1);
          group.save();
          res.json({
            isError: false,
            message: "User removed from the group",
            data: "",
          });
        })
        .catch((error) => {
          res.status(500).json({
            isError: true,
            message: "Failed to leave the group",
            data: error.message,
          });
        });
    } catch (error) {
      res.status(500).json({
        isError: true,
        message: "Internal server error",
        data: error.message,
      });
    }
  },
  deleteGroup: (req, res) => {  //api to delete group by admin
    const groupId = req.params.groupId;
    try {
      chatGroupCollection
        .findById(groupId)
        .then((group) => {
          if (!group) {
            return res.status(404).json({
              isError: true,
              message: "Group not found",
              data: "",
            });
          }
          chatGroupCollection.findByIdAndRemove(groupId);
          res.json({
            isError: false,
            message: "Group deleted successfully",
            data: "",
          });
        })
        .catch((error) => {
          res.status(500).json({
            isError: true,
            message: "Failed to delete the group",
            data: error.message,
          });
        });
    } catch (error) {
      res.status(500).json({
        isError: true,
        message: "Internal server error",
        data: error.message,
      });
    }
  },
  getChatGroupInfo: (req, res) => {  //api for getting chat group info
    const groupId = req.params.groupId;
    try {
      chatGroupCollection.findById(groupId).then((chat) => {
        res.send({
          isError: false,
          message: "",
          data: chat,
        });
      });
    } catch (error) {
      res.status(500).json({
        isError: true,
        message: "Internal server error",
        data: error.message,
      });
    }
  },
};
