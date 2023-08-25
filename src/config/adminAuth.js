module.exports = function validateAdmin(req,res,next) {
    if (!req.session.loggedInUser || req.session.loggedInUser.isAdmin !== "true") {
        return res.status(400).send({
          isError: true,
          message: "User is not admin",
          data: "",
        });
      }
    
      next();
}
