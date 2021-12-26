// const createError = require("http-errors");
const { NotFound, BadRequest } = require("http-errors");

const { Contact } = require("../models");

const { joiSchema } = require("../models/contactModel");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}, "_id name email phone favorite");
    // find-все возвращает[] и фильтрует. вторым арг указывается что нужно вывести в консоль

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;

    const contact = await Contact.findById(id);
    // const contact = await Contact.findOne({ _id: id });
    // findOne-возвращает {}

    if (!contact) {
      throw new NotFound();
      // throw new createError(404, "Not found");
    }

    res.json(contact);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404;
    }

    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { body } = req;

    const { error } = joiSchema.validate(body);

    if (error) {
      throw new BadRequest("missing required name field");
    }

    const newContact = await Contact.create(body);
    res.status(201).json(newContact);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }

    next(error);
  }
};

const changeContact = async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId: id } = req.params;

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

    res.json(updateContact);
  } catch (error) {
    next(error);
  }
};

const patchContact = async (req, res, next) => {
  try {
    // const { body } = req;
    const { contactId: id } = req.params;
    const { favorite } = req.body;

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

    res.json(updateContact);
  } catch (error) {
    if (error.message.includes("missing field favorite")) {
      error.status = 400;
    }

    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;

    const deleteContact = await Contact.findByIdAndRemove(id);
    // findByIdAndRemove-возвращает удаляемый товар

    if (!deleteContact) {
      throw new NotFound();
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContact,
  patchContact,
  deleteContact,
};
