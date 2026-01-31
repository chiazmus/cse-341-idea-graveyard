const { body, validationResult } = require("express-validator");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const IdeaValidationRules = () => {
  return [
    // make sure the category is actually a valid mongoId
    body("categoryId")
      .isMongoId()
      .withMessage("Make sure to put in an existing Category ID plz"),
    // makes sure the description is at least 5 characters long.
    body("description").isLength({ min: 5 }),
  ];
};

const CategoryValidationRules = () => {
  return [
    // makes sure the description is at least 5 characters long.
    body("description").isLength({ min: 5 }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  IdeaValidationRules,
  CategoryValidationRules,
  validate,
};
