const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
require("dotenv").config();

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

let getRandomUser = () => {
  return [
    faker.datatype.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// Total user count
app.get("/", (req, res) => {
  let q = `SELECT COUNT(*) FROM USER`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (error) {
    res.send("some error in DB");
    console.log(error);
  }
});

// Show all user
app.get("/user", (req, res) => {
  let q = `SELECT * FROM USER`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let users = result;
      res.render("users.ejs", { users });
    });
  } catch (error) {
    res.send("some error in DB");
    console.log(error);
  }
});

// Edit username
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM USER WHERE id = '${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (error) {
    res.send("some error in DB");
    console.log(error);
  }
});

// Update username
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { passowrd: formPass, username: newUsername } = req.body;
  let q = `SELECT * FROM USER WHERE id = '${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formPass != user.passowrd) {
        res.send("Worng Password");
      } else {
        let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
        try {
          connection.query(q2, (err, result) => {
            if (err) throw err;
            res.redirect("/user");
          });
        } catch (error) {
          res.send("some error in DB");
          console.log(error);
        }
      }
    });
  } catch (error) {
    res.send("some error in DB");
    console.log(error);
  }
});

// Add User
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

// Add New User
app.post("/user/new", (req, res) => {
  let { username, email, password } = req.body;
  let id = uuidv4();
  let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.redirect("/user");
    });
  } catch (error) {
    res.send("some error in DB");
    console.log(error);
  }
});

// Delete User
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (error) {
    res.send("some error in DB");
    console.log(error);
  }
});

// Delete User
app.delete("/user/:id/", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (user.password != password) {
        res.send("Worng Password");
      } else {
        let q2 = `DELETE FROM user WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (error) {
    res.send("some error in DB");
    console.log(error);
  }
});

app.listen("8080", () => {
  console.log("server is listening to port 8080");
});

/* ************************************************************* */
// Learn MySQL without Express and REST API :-
/*

Show the tables
let q = "SHOW TABLES";

Insert the Data (Query Placeholder :- ?, ?, ?, ?)
let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)"; OR
let q = "INSERT INTO user (id, username, email, password) VALUES ?";
let users = [["1", "Parth", "parth@gmail.com", "Parth@123"],
             ["2", "Raj", "raj@gmail.com", "Raj@123"]];


Multiple bulk data insert
let getRandomUser = () => {
    return [
        faker.datatype.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
}

let q = "INSERT INTO user (id, username, email, password) VALUES ?";
let users = [];
for(let i=0; i<100; i++){
    users.push(getRandomUser());
}


try {
    connection.query(q, [users], (err, result) => {
            if(err) throw err;
            console.log(result);
        }
    )
} catch (error) {
    console.log(error);
}

connection.end();

*/
