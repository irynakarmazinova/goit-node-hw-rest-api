const { v4 } = require("uuid");
// const { randomUUID } = require("crypto"); //встроенный модуль для генерации id

const fs = require("fs/promises");

const FILE_PATH = require("./contactsPath");

const listContacts = async () => {
  const contacts = JSON.parse(await fs.readFile(FILE_PATH));
  // const data = await fs.readFile(FILE_PATH);
  // const contacts = JSON.parse(data);

  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await listContacts();
  const result = contact.find(({ id }) => id === contactId);
  // const result = contact.find(({ id }) => String(id) === contactId);

  if (!result) {
    return null;
  }

  return result;
};

const updateContacts = async (contacts) => {
  await fs.writeFile(FILE_PATH, JSON.stringify(contacts, null, 2));
};

const addContact = async (body) => {
  const newContact = { id: v4(), ...body };
  const contacts = await listContacts();

  contacts.push(newContact);

  await updateContacts(contacts);
  //   fs.writeFile(FILE_PATH, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateContactById = async (contactId, body) => {
  // const updateContactById = async ({ contactId, name, email, phone }) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);

  if (idx === -1) {
    return null;
  }

  contacts[idx] = { id: contactId, ...body };
  // contacts[idx] = { ...contacts[idx], ...body };
  // contacts[idx] = { id: contactId, name, email, phone };
  await updateContacts(contacts);
  return contacts[idx];
};

const removeContactById = async (contactId) => {
  const contacts = await listContacts();
  //   const updateContacts = contacts.filter(({ id }) => id !== contactId);
  const idx = contacts.findIndex(({ id }) => id === contactId);

  if (idx === -1) {
    return null;
  }

  const newContacts = contacts.filter((_, index) => index !== idx);
  await updateContacts(newContacts);
  return contacts[idx];

  // const removeContact = contacts.splice(idx, 1);
  // await updateContacts(contacts);
  // return removeContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
};
