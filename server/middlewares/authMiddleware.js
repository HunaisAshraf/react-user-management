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

module.exports = { requireSignIn };
