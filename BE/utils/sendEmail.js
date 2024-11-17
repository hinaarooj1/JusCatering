const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      //   secure: Boolean(process.env.SECURE),
      auth: {
        user: "orderjuscatering@gmail.com",
        pass: "oovk zhph gdjo sfjn",
      },
    });

    let data = await transporter.sendMail({
      from: "orderjuscatering@gmail.com",
      to: email,
      subject: subject,
      html: text,
    });
    console.log("email sent successfully", transporter, data);
    return null;

  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
