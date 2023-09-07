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
