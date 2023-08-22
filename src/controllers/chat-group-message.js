const chatMessageCollection = require('mongoose').model('chatMessageCollection');

module.exports = {
    saveChatMessages: (req,res) => { //api to save chat messages
        const data = {
            chatGrpId: req.body.chatGrpId,
            user: req.body.user,
            time: req.body.time,
            message: req.body.message,
          };
          try {
            chatMessageCollection
              .insertMany([data])
              .then(() => {
                res.send({ message: "Chat message sent successfully" });
              })
              .catch((err) => {
                res.send(err);
                res.status(500).json({ error: "Cannot save" });
              });
          } catch (err) {
            res.status(500).json({ error: "Internal server error" });
          }
    },
    getAllMessage: (req,res) => {  //api for getting all message for chat group
        const groupId = req.params.groupId;
        try {
          chatMessageCollection.find({ chatGrpId: groupId }).then((chat) => {
            res.send(chat);
          });
        } catch (err) {
          res.status(500).json({ err: "Internal server error" });
        }
    }
}
