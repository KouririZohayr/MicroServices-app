const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 8080;
app.use(express.json());
app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});
app.listen(PORT, () => {
  console.log(`frontend-Service at ${PORT}`);
});
