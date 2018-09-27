const express = require("express");
const app = express();
const PORT = 4000;

app.use("/", (_, res) => {
  res.send("Hello, world");
});

app.listen(PORT, console.log(`listening on http://localhost:${PORT}`));
