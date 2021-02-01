const express = require("express");
const { backPort } = require("./conf");
const passport = require("passport");

const app = express();
app.use(express.json());
app.use(passport.initialize());

/* --------------------------------------------------------------------- Routes */

app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes/misc"));

/* --------------------------------------------------------------------- 404 and server launch */
app.use((req, res) => {
  const msg = `Page not found: ${req.url}`;
  console.warn(msg);
  res.status(404).send(msg);
});

app.listen(backPort, () => {
  console.log(`API root available at: http://localhost:${backPort}/`);
});
