const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      pass: process.env.NODEMAILER_PORT,
      secure: process.env.NODEMAILER_SECURE,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const options = {
      from: "vijender@matrixinfotechsolution.com",
      to: email,
      subject: subject,
      text: text,
    };

    await transport.sendMail(options);
    console.log("Email sent Successfully");
  } catch (error) {
    console.log("Email not sent");
  }
};
