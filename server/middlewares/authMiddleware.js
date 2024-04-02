const JWT = require("jsonwebtoken");

const requireSignIn = (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "error in requireSignIn",
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.user.role === 1) {
      next();
    } else {
      res.status(401).send({
        success: false,
        message: "unauthorised user",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { requireSignIn, isAdmin };
