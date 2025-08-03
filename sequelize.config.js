require("ts-node/register");
const config = require("./config/config.ts");

module.exports = config.default || config;
