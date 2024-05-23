const jwt = require("jsonwebtoken");
const HttpError = require("../util/httpError");

const verifyToken = async (request, response, next) => {
  if (request?.headers?.authorization?.split(" ")[0] !== "JWT")
    return next(new HttpError("You are not authorised.", 401));

  jwt.verify(
    request.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET,

    function (error, decode) {
      if (error) {
        next(new HttpError("You are not authorised.", 401));
      } else {
        request.jwtUserId = decode.id;
        next();
      }
    }
  );
};

module.exports = verifyToken;
