const CREATECHATGROUP_CONTROLLER = require("../controllers/create-chat-group");

module.exports = (APP) => {
  APP.post("/create-chat-group", CREATECHATGROUP_CONTROLLER.createChatGroup);
  APP.put("/group/:groupId", CREATECHATGROUP_CONTROLLER.updateChatGroup);
  APP.get("/groups/:userId", CREATECHATGROUP_CONTROLLER.getAll);
  APP.delete("/groups/:groupId/users/:userId", CREATECHATGROUP_CONTROLLER.leaveGroup);
  APP.delete("/groups/:groupId", CREATECHATGROUP_CONTROLLER.deleteGroup);
  APP.get("/group/:groupId", CREATECHATGROUP_CONTROLLER.getChatGroupInfo);
};
