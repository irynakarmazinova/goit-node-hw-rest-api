// вся бизнес логика в сервис

// const createError = require("http-errors");
const { NotFound, BadRequest } = require("http-errors");

const { joiSchema } = require("../models/contactModel");
const { Contact } = require("../models");

const getContacts = async () => {
  const contacts = await Contact.find({}, "_id name email phone favorite");
  // find-все возвращает[] и фильтрует. вторым арг указывается что нужно вывести в консоль
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  // const contact = await Contact.findOne({ _id: id });
  // findOne-возвращает {}

  if (!contact) {
    throw new NotFound();
    // throw new createError(404, "Not found");
  }

  return contact;
};

const addContact = async (body) => {
  const { error } = joiSchema.validate(body);

  if (error) {
    throw new BadRequest("missing required name field");
  }

  const newContact = await Contact.create(body);

  return newContact;
};

const changeContactById = async (id, body) => {
  const { error } = joiSchema.validate(body);

  if (error) {
    throw new BadRequest("missing fields");
  }

  const updateContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  // findByIdAndUpdate-возвращает старый объект, а не новый обновленный. нужно добавить трейтий арг{new: true,}

  if (!updateContact) {
    throw new NotFound();
  }

  return updateContact;
};

const patchContact = async (id, { favorite }) => {
  // const { error } = joiSchema.validate(body);

  // if (error) {
  //   throw new BadRequest("missing field favorite");
  // }

  const updateContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    {
      new: true,
    }
  );
  // findByIdAndUpdate-возвращает старый объект, а не новый обновленный. нужно добавить трейтий арг{new: true,}

  if (!updateContact) {
    throw new NotFound();
  }

  return updateContact;
};

const deleteContactById = async (id) => {
  const deleteContact = await Contact.findByIdAndRemove(id);
  // findByIdAndRemove-возвращает удаляемый товар

  if (!deleteContact) {
    throw new NotFound();
  }

  return deleteContact;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  patchContact,
  deleteContactById,
};
