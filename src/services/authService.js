const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BadRequest, Conflict, Unauthorized } = require("http-errors");

const { joiSignupSchema, joiLoginSchema } = require("../models/userModel");
const { User } = require("../models");

const { JWT_SECRET } = process.env;

const signout = async (body, name, email, password, subscription) => {
  const { error } = joiSignupSchema.validate(body);
  // body-схема проверяет соотвествует ли тело запроса тому, что написано в joiSchema

  if (error) {
    throw new BadRequest(error.message);
  }

  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    subscription,
  });
  // const newUser = new User({ name, email });
  // newUser.setPassword(password);
  // const result = newUser.save();

  return newUser;
};

const login = async (body, email, password, subscription) => {
  const { error } = joiLoginSchema.validate(body);

  if (error) {
    throw new BadRequest(error.message);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  // const passwordCompare = user.comparePassword(password);

  if (!passwordCompare) {
    throw new Unauthorized("Email or password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      subscription: user.subscription,
    },
    JWT_SECRET
  );

  return token;
};
const logout = async () => {};
const current = async () => {};

module.exports = { signout, login, logout, current };
