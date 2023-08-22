const LOGIN_CONTROLLER = require("../controllers/login");

module.exports = (APP) => {
    APP.get("/getAll", LOGIN_CONTROLLER.fetchAllUsers);
    APP.delete("/delete/:id", LOGIN_CONTROLLER.deleteUser);
    APP.put("/users/:userId", LOGIN_CONTROLLER.updateUsername);
    APP.post("/signup", LOGIN_CONTROLLER.registration);
    APP.post("/login", LOGIN_CONTROLLER.login);
    APP.post("/search-user", LOGIN_CONTROLLER.searchUser);
  };
