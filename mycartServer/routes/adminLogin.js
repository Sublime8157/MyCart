const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const sql = require("mssql");
const conn = require("../javascripts/database");
const cors = require("cors");

router.post("/", cors(), async (req, res) => {
    const {username, password} = req.body; 
    try {
        const pool = await conn.connect();
        const request = pool.request();

        const checkExistQuery = await request.input("username", sql.VarChar, username)
            .input("password", sql.VarChar, password)
            .query(`SELECT Id FROM tblAdministratorLogin WHERE Username = @username AND Password = @password`) 
        
        setTimeout(() => {
            if(checkExistQuery.recordset.length > 0) {
                res.json({
                    status: "success",
                    message: "Login successful"
                })
            } else {
              res.json({
                status: "error",
                message: "Invalid username or password"
              })
            }
        }, 3000)

    } catch(error) {
        console.error(error)
    }
})

module.exports = router;