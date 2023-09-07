const express = require("express");
const config = {
  host: "database",
  user: "root",
  password: "root",
  database: "database",
};
const mysql = require("mysql");
const app = express();
const port = 3000;

const connection = mysql.createConnection(config);
connection.query(
  "CREATE TABLE IF NOT EXISTS Names (id int auto_increment, name VARCHAR(255), primary key (id))",
  (err, result) => {
    if (err) throw err;
    console.log("Table created");
  }
);
connection.query(
  "INSERT INTO Names (name) VALUES ('Gustavo'), ('Santos'), ('Ricardo')",
  (err, result) => {
    if (err) throw err;
    console.log("Data inserted");
  }
);
connection.end();

app.get("/", (req, res) => {
  const connection = mysql.createConnection(config);
  connection.query("SELECT * FROM Names", (err, result) => {
    if (err) throw err;
    const names = result.map((item) => `<li>${item.name}</li>`);
    let html = `<h1>Full Cycle Rocks!</h1><ul>${names.join("")}</ul>`;
    res.send(html);
  });
  connection.end();
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));
