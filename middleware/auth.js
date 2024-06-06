const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret";

async function auth(req, res, next) {
  const autoHeader = req.headers.authorization;
  if (!autoHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = autoHeader.split(" ")[1];

  try {
    if (token) {
      const decodedToken = jwt.verify(token, SECRET_KEY);
      req.user = decodedToken;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = auth;
