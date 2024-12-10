const { body, validationResult } = require("express-validator");
const sql = require("mssql");

const validateRegistrationData = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .custom(async (username) => {
      const pool = await sql.connect();
      const result = await pool
        .request()
        .input("username", sql.VarChar, username)
        .query("SELECT Id FROM tblUsers WHERE Username = @username");
      if (result.recordset.length > 0) {
        return Promise.reject("Username already exists");
      }
    }),

  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const pool = await sql.connect();
      const result = await pool
        .request()
        .input("email", sql.VarChar, email)
        .query("SELECT Id FROM tblUsers WHERE Email = @email");
      if (result.recordset.length > 0) {
        return Promise.reject("Email already exists");
      }
    }),

  body("birthDate").isISO8601().withMessage("Invalid birthdate format"),
  body("mobileNumber")
    .isLength({ min: 10, max: 15 })
    .withMessage("Invalid mobile number"),
  body("address").notEmpty().withMessage("Local address is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain capital letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain numbers"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match!");
    }
    return true;
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = validateRegistrationData;
