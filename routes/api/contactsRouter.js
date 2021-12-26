const { Router } = require("express");
const router = Router();

// const contactsControllers = require("../../controllers");
const {
  getContacts,
  getContactById,
  addContact,
  changeContact,
  patchContact,
  deleteContact,
} = require("../../controllers/contactsController");

// получить все
// app.use("/api/contacts/...
router.get("/", getContacts);

// получить по id
// app.use("/api/contacts/id...
router.get("/:contactId", getContactById);

// добавить
router.post("/", addContact);

// обновить
router.put("/:contactId", changeContact);

// обновить частично
router.patch("/:contactId/favorite", patchContact);

// удалить
router.delete("/:contactId", deleteContact);

module.exports = { contactsRouter: router };
