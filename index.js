const express = require("express");
const util = require("./utils");
console.log(util);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get("/", (req, res) => {
  res.send(`Hello world`);
});

const userList = [];

app.post("/user/register", (req, res) => {
  console.log("register received: ", req.body);
  let user = req.body;
  user.user_name = util.makeUuidNumber(8);
  userList.push(req.body);
  res.send({
    data: { user, token: "fake token" },
    msg: "Success",
  });
});

app.post("/user/login", (req, res) => {
  console.log("login received: ", req.body);
  const index = userList.findIndex(
    (user) =>
      user.user_name == req.body.authenticate_info &&
      user.password == req.body.password
  );
  if (index >= 0) {
    res.send({
      data: { user: userList[index], token: "fake token" },
      msg: "Success",
    });
  } else {
    res.send({
      message: "User not found",
      errors: [],
    });
  }
});
