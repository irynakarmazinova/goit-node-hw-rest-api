const { Router } = require("express");
const router = Router();

// const { asyncWrapper } = require("../../src/helpers/apiHelpers");

// const contactsControllers = require("../../controllers");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  changeContactController,
  patchContactController,
  deleteContactController,
} = require("../../src/controllers/contactsController");

// получить все
// app.use("/api/contacts/...
router.get("/", getContactsController);

// получить по id
// app.use("/api/contacts/id...
router.get("/:contactId", getContactByIdController);
// router.get("/", asyncWrapper(getContactByIdController));

// добавить
router.post("/", addContactController);

// обновить
router.put("/:contactId", changeContactController);

// обновить частично
router.patch("/:contactId/favorite", patchContactController);

// удалить
router.delete("/:contactId", deleteContactController);

module.exports = { contactsRouter: router };
