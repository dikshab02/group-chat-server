module.exports = function validateLogin(req, res, next) {
//   console.log("LOGGEDIN: ", req.session.loggedInUser);
  if (!req.session.loggedInUser) {
    return res.status(400).send({
      isError: true,
      message: "No logged in user found",
      data: "",
    });
  }

  next();
};
