const axios = require("axios");

module.exports = {
  makeUuid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  makeUuidNumber(length) {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  makeRandomGreeting() {
    const greetings = [
      "How ya!",
      "How are you?",
      "Hello moto!",
      "I'm fine thankyou. And you?",
      "Lorem ipsum dolor sit amet",
      "This is bull shirt.",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  },
  makeAPIPost(url, config, data) {
    return axios.post(url, data, config);
  },
};
