const CHATGROUPMESSAGE_CONTROLLER = require("../controllers/chat-group-message");
const validateLogin = require('../config/loggedInAuth')

module.exports = (APP) => {
    APP.post("/chat",validateLogin, CHATGROUPMESSAGE_CONTROLLER.saveChatMessages);
    APP.get("/message/:groupId",validateLogin, CHATGROUPMESSAGE_CONTROLLER.getAllMessage);
    APP.put("/message/like/:messageId",validateLogin, CHATGROUPMESSAGE_CONTROLLER.likeChatMessage)
};
