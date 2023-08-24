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
                res.send({ 
                  isError: false,
                  message: "Chat message sent successfully",
                  data: '' });
              })
              .catch((error) => {
                res.status(500).json({ 
                  isError: true,
                  message: "Cannot save",
                  data: error });
              });
          } catch (error) {
            res.status(500).json({ 
              isError: true,
              message: "Internal server error",
              data: error });
          }
    },
    getAllMessage: (req,res) => {  //api for getting all message for chat group
      const sessionName = req.session;
      console.log("\nsess",sessionName)
      console.log("sess",req.session.id)
        const groupId = req.params.groupId;
        try {
          chatMessageCollection.find({ chatGrpId: groupId }).then((chat) => {
            res.send({
              isError: false,
              message: '',
              data: chat
            });
          });
        } catch (error) {
          res.status(500).json({ 
            isError: true,
            message: "Internal server error",
            data: error });
        }
    }
}
