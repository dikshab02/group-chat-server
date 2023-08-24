const CHATGROUPMESSAGE_CONTROLLER = require("../controllers/chat-group-message");

module.exports = (APP) => {
    APP.post("/chat", CHATGROUPMESSAGE_CONTROLLER.saveChatMessages);
    APP.get("/message/:groupId", CHATGROUPMESSAGE_CONTROLLER.getAllMessage);
    APP.put("/message/like/:messageId", CHATGROUPMESSAGE_CONTROLLER.likeChatMessage)
};
