const path = require("path");

const FILE_PATH = path.normalize(__dirname + "./../model/contacts.json");
// const FILE_PATH = path.join(__dirname, "../model/contacts.json");
// const FILE_PATH = path.resolve();

module.exports = FILE_PATH;
