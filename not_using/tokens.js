"use strict";

const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret";

/** return signed JWT {username, isAdmin} from user data. */

function createToken(user) {

  let payload = {
    username: user.username,
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
