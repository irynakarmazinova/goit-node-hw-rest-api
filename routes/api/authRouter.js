const { Router } = require("express");
const router = Router();

// const { asyncWrapper } = require("../../src/helpers/apiHelpers");

const {
  signupController,
  loginController,
  logoutController,
  currentController,
} = require("../../src/controllers/authController");

// app.use("/api/auth/users/signup or register... -зарегестрироваться
router.post("/signup", signupController);
// router.get("/", asyncWrapper(signupController));

// app.use("/api/auth/users/signin or login... -залогиниться, войти
// route.post("login",loginController );

// router.post("/logout", logoutController);
// router.post("/current",currentController);

// ---
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BadRequest, Conflict, Unauthorized } = require("http-errors");

const {
  joiSignupSchema,
  joiLoginSchema,
} = require("../../src/models/userModel");
const { User } = require("../../src/models");

const { JWT_SECRET } = process.env;

// router.post("/signup", async (req, res, next) => {
//   try {
//     const { body } = req;
//     const { name, email, password, subscription } = req.body;
//     const { error } = joiSignupSchema.validate(body);
//     // body-схема проверяет соотвествует ли тело запроса тому, что написано в joiSchema

//     if (error) {
//       throw new BadRequest(error.message);
//     }

//     const user = await User.findOne({ email });

//     if (user) {
//       throw new Conflict("Email in use");
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashPassword,
//       subscription,
//     });
//     // const newUser = new User({ name, email });
//     // newUser.setPassword(password);
//     // const result = newUser.save();

//     res.status(201).json({
//       user: {
//         name: newUser.name,
//         email: newUser.email,
//         // password: newUser.password,
//         subscription: newUser.subscription,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/login", async (req, res, next) => {
  try {
    const { body } = req;
    const { email, password, subscription } = req.body;
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
    res.json({ status: "success", token });

    // res.status(200).json({
    //   token: "",
    //   user: {
    //     email: newUser.email,
    //     subscription: newUser.subscription,
    //   },
    // });
  } catch (error) {
    next(error);
  }
});
// ----

module.exports = { authRouter: router };
