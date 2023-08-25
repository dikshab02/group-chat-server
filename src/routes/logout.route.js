const LOGOUT_CONTROLLER = require("../controllers/logout");

module.exports = (APP) => {
    APP.get("/logout", LOGOUT_CONTROLLER.logout);
}
