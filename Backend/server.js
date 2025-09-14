const express = require("express");
const connecton = require("./mysqlconnection.js");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
app.use(cors());
app.use(express.json());

function getUser(callback) {
  connection.query("select * from users", (err, result) => {
    if (err) {
      callback(err, null);
      // return err;
    } else {
      callback(result, null);
      // return result;
    }
  });
}

app.post("/addUser", (req, res) => {
  const user = req.body;
  getUser((result, err) => {
    if (err) {
      return res.status(500).send("Database error", err);
    }
    const userExists = result.some((item) => item.Email == user.Email);
    // console.log(userExists)
    if (!userExists) {
      connection.query("INSERT INTO users SET ?", [user], (error, results) => {
        if (error) {
          console.error("Error inserting data:", error);
          return;
        }
        return res.status(200).send({ exists: false });
      });
    } else {
      return res.status(200).send({ exists: true, message: "User existed" });
    }
  });
});

app.post("/loginUser", (req, res) => {
  const user = req.body;
  // console.log(user)
  getUser((list, err) => {
    if (err) {
      return err;
    }
    // console.log(list)
    const userStatus = list.find((loginUser) => loginUser.Email == user.Email);
    // console.log(userStatus)
    // console.log(userStatus)
    if (!userStatus) {
      return res
        .status(400)
        .send({ status: false, message: "Email not found" });
    }
    const passwordStatus = userStatus.Password == user.Password;
    if (!passwordStatus) {
      return res.status(400).send({ message: "Incorrect Password" });
    }
    return res.status(200).send({ status: true, message: "Login Successul" });
  });
});
app.listen(3000, () => {
  console.log("server started on localhost:3000");
});
