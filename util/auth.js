const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.id = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({
      title: "not authenticated",
    });
  }
};

module.exports = auth;
