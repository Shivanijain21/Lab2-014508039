`use strict`;

const env = process.env.NODE_ENV || "development";
const config = require(`./environment/${env}`);
console.log("config:: ", config);

module.exports = Object.assign({}, config);
