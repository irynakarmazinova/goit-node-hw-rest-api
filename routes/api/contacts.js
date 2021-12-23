const express = require("express");
const router = express.Router();
const Joi = require("joi");

// const createError = require("http-errors");
const { NotFound, BadRequest } = require("http-errors");

const contactsOperations = require("../../model");

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await contactsOperations.getContactById(id);

    if (!contact) {
      throw new NotFound();
      // throw new createError(404, "Not found");

      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;

  try {
    const { error } = joiSchema.validate(body);

    if (error) {
      throw new BadRequest("missing required name field");
      // throw new BadRequest(error.message);
      // throw new CreateError(400, "missing required name field");
    }

    const newContact = await contactsOperations.addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const body = req.body;
  const { id } = req.params;

  try {
    const { error } = joiSchema.validate(body);

    if (error) {
      throw new BadRequest("missing fields");
      // throw new BadRequest(error.message);
      // throw new CreateError(400, "missing fields");
    }

    // const updateContact = await contactsOperations.updateContactById(
    //   id,
    //   body
    // );
    const updateContact = await contactsOperations.updateContactById({
      id,
      ...body,
    });

    if (!updateContact) {
      throw new NotFound();
    }

    res.json(updateContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteContact = await contactsOperations.removeContactById(id);

    if (!deleteContact) {
      throw new NotFound();
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
