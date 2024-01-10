const nodemailer = require("nodemailer");
const nodeConstant = require("../config/nodeConstant");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: nodeConstant.EMAIL_GMAIL_SERVICE,
    pass: nodeConstant.PASS_GMAIL_SERVICE,
  },
});

const sendMail = async (mailFor, mailTo, content) => {
  try {
    console.log("mailfor", mailFor);

    let mailDetails;

    if (mailFor === "registration") {
      mailDetails = {
        from: nodeConstant.EMAIL_FROM_GMAIL_SERVICE,
        to: mailTo,
        subject: "Registration on HealthCare",
        text: "Hi this is second test mail",
      };
    }

    const result = await transporter.sendMail(mailDetails);
    console.log("Email sent successfully:", result);
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

module.exports = { sendMail };
