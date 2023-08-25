const CREATECHATGROUP_CONTROLLER = require('../controllers/create-chat-group');
const validateLogin = require('../config/loggedInAuth')

module.exports = (APP) => {
  APP.post("/create-chat-group",validateLogin, CREATECHATGROUP_CONTROLLER.createChatGroup);
  APP.put("/group/:groupId",validateLogin, CREATECHATGROUP_CONTROLLER.updateChatGroup);
  APP.get("/groups/:userId",validateLogin, CREATECHATGROUP_CONTROLLER.getAll);
  APP.delete("/groups/:groupId/users/:userId",validateLogin, CREATECHATGROUP_CONTROLLER.leaveGroup);
  APP.delete("/groups/:groupId",validateLogin, CREATECHATGROUP_CONTROLLER.deleteGroup);
  APP.get("/group/:groupId",validateLogin, CREATECHATGROUP_CONTROLLER.getChatGroupInfo);
};
