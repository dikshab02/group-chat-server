const LOGIN_CONTROLLER = require("../controllers/login");
const validateAdmin = require('../config/adminAuth')
const validateLogin = require('../config/loggedInAuth')

module.exports = (APP) => {
    APP.get("/getAll",validateAdmin, LOGIN_CONTROLLER.fetchAllUsers);
    APP.delete("/delete/:id",validateAdmin, LOGIN_CONTROLLER.deleteUser);
    APP.put("/users/:userId",validateAdmin, LOGIN_CONTROLLER.updateUsername);
    APP.post("/signup", LOGIN_CONTROLLER.registration);
    APP.post("/login", LOGIN_CONTROLLER.login);
    APP.post("/search-user",validateLogin, LOGIN_CONTROLLER.searchUser);
  };
