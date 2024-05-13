const HttpError = require("../util/httpError");
const { validationResult } = require("express-validator");

const inputValidation = async (request, response, next) => {
  const errors = validationResult(request);
  if (errors.isEmpty()) return next();

  return next(new HttpError("Please provide valid information."));
};

module.exports = inputValidation;
