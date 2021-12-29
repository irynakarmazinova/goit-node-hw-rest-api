const { signout, login, logout, current } = require("../services/authService");

const signupController = async (req, res, next) => {
  try {
    const { body } = req;
    const { name, email, password, subscription } = req.body;

    await signout(body, name, email, password, subscription);

    //   как сюда передать хэшированный пароль? ньююзер?
    //   почему не выводится по дефолту сабскрипшн?
    res.status(201).json({
      user: {
        name,
        email,
        // password: password,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { body } = req;
    const { email, password, subscription } = req.body;

    const token = await login(body, email, password, subscription);

    // res.status(200).json({
    //   token: "",
    //   user: {
    //     email: newUser.email,
    //     subscription: newUser.subscription,
    //   },
    // });
    res.json({ status: "success", token });
  } catch (error) {
    next(error);
  }
};
const logoutController = async (req, res, next) => {};
const currentController = async (req, res, next) => {};

module.exports = {
  signupController,
  loginController,
  logoutController,
  currentController,
};
