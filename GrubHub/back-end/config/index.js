`use strict`;

let common = require("./environment/common");

const env = process.env.NODE_ENV || "development";
const config = require(`./environment/${env}`);

module.exports = Object.assign({}, common, config);
