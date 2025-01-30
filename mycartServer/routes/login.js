const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const sql = require("mssql");
const conn = require("../javascripts/database");
const cors = require("cors");

router.post("/", cors(), async (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT Id, Username, Password FROM tblUSers WHERE Username = @username`;
  try {
    const pool =  conn.connect();
    const request = pool.request();
    request.input("username", sql.VarChar, username);

    const result = await request.query(query);
    if (result.recordset.length) {
      const user = result.recordset[0];
      if (user.DateVerified !== null) {
        if (user.Password === null) {
          res.json({
            status: "error",
          });
        } else {
          const isMatch = await bcrypt.compare(password, user.Password);
          if (isMatch) {
            const userId = user.Id;
            const loggedIn = `UPDATE tblUsers SET LastLoggedIn = GETDATE() WHERE Id = @userId`;
            request.input("userId", sql.Int, userId);
            await request.query(loggedIn);
            res.json({
              status: "success",
              userId: userId
            });
          } else {
            res.json({
              status: "error",
              message: "Invalid credentials",
            });
          }
        }
      } else { 
        res.json({
          status: "emailError",
          message: "Email not verified",
        });
      }
    } else {
      res.json({
        status: "error",
        message: "User not found",
      });
    }
  } catch (e) {
    return res.status(500).json({ message: "Error retrieving data", error: e });
  }
});

module.exports = router;
