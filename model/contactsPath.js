const path = require("path");

const contactsPath = path.join(__dirname, "../model/contacts.json");
// const contactsPath = path.normalize(__dirname, "../model/contacts.json");
// const FILE_PATH = path.normalize(__dirname, "../model/contacts.json");
// const contacts = require("./contacts.json");

module.exports = contactsPath;
