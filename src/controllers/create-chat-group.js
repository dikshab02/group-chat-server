const chatGroupCollection = require('mongoose').model('ChatGroupCollection');
module.exports = {
    createChatGroup: (req, res) => { //api to create a chat group
        try {
            const chatGroup = req.body.chatGroup;
            chatGroupCollection.insertMany([chatGroup])
            .then((cg)=>{
                res.send({ response: "Chat group created" });
            })
            .catch((err)=> {
                res.send(err);
                res.status(500).json({ error: "Chat group not created" });
            });
            
          } catch (err) {
            res.status(500).json({ error: "Internal server error" });
          }
    },
    updateChatGroup: (req,res) => {  //api to update chat group
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
                res.send({ response: "Group updated" });
              } else {
                res.status(400).json({ error: "Group not found" });
              }
            })
            .catch((err) => {
              res.status(500).json({ err: "Failed to execute query" });
            });
        } catch (err) {
          res.status(500).json({ err: "Internal server error" });
        }
    },
    getAll: (req, res) => { //get all chat groups for a given user
        const userId = req.params.userId;
        try {
          chatGroupCollection.find({ "users._id": userId })
          .then((groups) =>{
            res.send(groups);
          })
          .catch((err) => {
                res.status(500).json({ err: "failed to get chat groups for a given user"})
          });   
        } catch (err) {
          res.status(500).json({ err: "Internal server error" });
        }
    },
    leaveGroup: (req,res) => { //api to leave group
        const groupId = req.params.groupId;
        const userId = req.params.userId;
        try {
          chatGroupCollection.findById(groupId)
          .then((group) =>{
            if (!group) return res.status(404).json({ error: "Group not found" });
      
            const userIndex = group.users.findIndex(
              (user) => user._id.toString() === userId
            );
            if (userIndex === -1) {
              return res.status(404).json({ error: "User not found in the group" });
            }
            group.users.splice(userIndex, 1);
            group.save();
            res.json({ message: "User removed from the group" });
          })
          .catch((err) => {
            res.status(500).json({err: "Failed to leave the group"})
          });
        } catch (error) {
          res.status(500).json({ error: "Internal server error" });
        }
    },
    deleteGroup: (req,res) => { //api to delete group by admin
        const groupId = req.params.groupId;
        try {
          chatGroupCollection.findById(groupId)
          .then((group) => {
            if (!group) {
                return res.status(404).json({ error: "Group not found" });
              }
              chatGroupCollection.findByIdAndRemove(groupId);
              res.json({ message: "Group deleted successfully" });
          })
          .catch((err) => {
            res.status(500).json({err: "Failed to delete the group"})
          });

        } catch (err) {
          res.status(500).json({ error: "Internal server error" });
        }
    },
    getChatGroupInfo: (req,res) => {  //api for getting chat group info
      const groupId = req.params.groupId;
      try {
        chatGroupCollection.findById(groupId).then((chat) => {
          res.send(chat);
        });
      } catch (err) {
        res.status(500).json({ err: "Internal server error" });
      }
    }
}
