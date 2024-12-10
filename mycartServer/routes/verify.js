require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const sql = require("mssql");
const conn = require("../javascripts/database");
const secret = process.env.JWT_SECRET;
const { sendEmail }  = require('../mail/sendEmailVerificationRegistration');

const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.query.token;

  try {
    const decoded = jwt.verify(token, secret); // decode the secret, it should be similar to the secret from the sendEmail
    const email = decoded.email; // retrieve the email

    const pool = await conn.connect(); // initiate a connection
    const request = pool.request(); // start a request

    request.input("email", sql.VarChar, email);

    const query = "UPDATE tblUsers SET DateVerified = GETDATE() WHERE Email = @email";
    const result = await request.query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found or already verified!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "You are successfully verified, thank you for chossing My Cart!",
      });
    }
  } catch (err) {
    console.error("Error Occured", err);
    return res.status(500).send("An error occurred while verifying the user.");
  }
});

router.get("/email", async (req, res) => {
  const email = JSON.parse(req.query.email);
  const emailAddress = email.email;

  if (!emailAddress) {
    return res.status(400).send({
      status: "error",
      msg: "No email provided",
    });
  }
  try {
    const pool = await conn.connect();
    const request = pool.request();

    request.input("emailAddress", sql.VarChar, emailAddress);

    const query = "SELECT Id FROM tblUSers WHERE Email = @emailAddress";
    const result = await request.query(query);
    if (result.recordset.length === 0) {
      return res.status(400).send({
        status: "error",
        msg: "Email does not exist",
      });
    } else {
      const sendResult = await sendEmail(email);
      if (sendResult) {
        setTimeout(() => {
          return res.status(200).send({
            status: "success",
            message: "Email verification has been sent successfully",
          });
        }, 3000)
      } else {
        return res.status(500).send({
          status: "error",
          msg: "Failed to send email verification",
        });
      }
    }
  } catch (error) {
    return res.status(400).send({
      status: "error",
      msg: error
    });
  }
});

module.exports = router;
