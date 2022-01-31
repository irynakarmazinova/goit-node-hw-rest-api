const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_API_KEY, IRYNA_MAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//   to: "talagew164@mannawo.com",
//   // https://temp-mail.org/ru/-временный мэил
//   from: IRYNA_MAIL,
//   subject: "Новая заявка с сайта",
//   html: "<p>Ваша заявка принята</p>",
// };
// sgMail
//   .send(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

// код отправки письма. получение ответного письма не предусматривается-придет на емэил.
const sendEmail = async (data) => {
  // in data содерж 3 поля-to,sub,html

  // eslint-disable-next-line no-useless-catch
  try {
    const email = { ...data, from: IRYNA_MAIL };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
