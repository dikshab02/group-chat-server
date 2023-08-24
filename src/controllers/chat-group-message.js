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
                  message: "Failed to save chat message",
                  data: error.message });
              });
          } catch (error) {
            res.status(500).json({ 
              isError: true,
              message: "Internal server error",
              data: error.message });
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
            data: error.message });
        }
    },
    likeChatMessage: (req,res) => { //api to like message
      const messageId = req.params.messageId;
      const userId =  req.body.userId;
      try {
        chatMessageCollection.findById(messageId)
        .then((message) => {
            if(!message)
            {
              return res.status(404).json({
                isError: true,
                message: 'Message not found',
                data: ''
              })
            }
            const likedIndex = message.likedByUsers.indexOf(userId);
            if(likedIndex === -1){
              message.likedByUsers.push(userId);
            }
            else
            {
              message.likedByUsers.splice(likedIndex,1);
            }
            message.save();
            res.status(200).json({
              isError: false,
              message: likedIndex === -1 ? 'Message liked successfully' : 'Message unliked successfully',
              data: userId
            })
        })
      }
      catch(error) {
        res.send({
          isError: true,
          message: 'Internal server error',
          data: error.message
        })
      }
    }
}
