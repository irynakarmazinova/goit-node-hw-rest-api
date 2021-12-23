const { v4 } = require("uuid");

const fs = require("fs/promises");

const dotenv = require("dotenv");
dotenv.config();
// require("dotenv").config();

const contactsPath = require("./contactsPath");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  // const contacts = JSON.parse(await fs.readFile(contactsPath));
  return contacts;
};

const getContactById = async (id) => {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === id);

  if (!result) {
    return null;
  }

  return result;
};

const updateContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  const newContact = { id: v4(), ...body };
  const contacts = await listContacts();

  contacts.push(newContact);

  await updateContacts(contacts);
  //   fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

// const updateContactById = async (id, body) => {
const updateContactById = async ({ id, name, email, phone }) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);

  if (idx === -1) {
    return null;
  }

  // contacts[idx] = { ...body };
  contacts[idx] = { id, name, email, phone };
  await updateContacts(contacts);
  return contacts[idx];
};

const removeContactById = async (id) => {
  const contacts = await listContacts();
  //   const updateContacts = contacts.filter(({ id }) => id !== id);
  const idx = contacts.findIndex((item) => item.id === id);

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
