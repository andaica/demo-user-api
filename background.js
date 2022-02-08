const util = require("./utils");

module.exports = {
  startBackgroundInterval(url, timeout) {
    setInterval(() => {
      util.makeAPIGet(url, {});
    }, timeout);
  },
};
