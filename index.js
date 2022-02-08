const express = require("express");
const util = require("./utils");
const cors = require("cors");
const background = require("./background");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

background.startBackgroundInterval("http://localhost:8000/pwa/send", 10000);
console.log("Start background send pwa message");

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

// demo send PWA message to topic
app.get("/pwa/send", (req, res) => {
  const message = util.makeRandomGreeting();
  util
    .makeAPIPost(
      "https://fcm.googleapis.com/fcm/send",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "key=AAAAS-dKI_k:APA91bGKBR4NQSlqehLnLp2WzDkmpk4WkbbYSEavxcPltmVRsuZ-8MlVnc13B4dQlc2H8cBiE0gs_Rh2MJog7O9QVmZFtVQPUAzFW5_vGomgCk-tSbOOz_bGP8EyQUJ2gHp0fvcoByC6",
        },
      },
      {
        data: {
          title: message,
          body: "Greeting from server!",
        },
        to: "/topics/andaica",
      }
    )
    .then((data) => res.send("OK"))
    .catch((error) => res.send(error));
});
