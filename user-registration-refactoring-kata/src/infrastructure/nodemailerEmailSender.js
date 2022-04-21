import nodemailer from 'nodemailer';
import SendEmailError from '../domain/SendEmailError';

async function emailSender({ from, to, subject, body }) {
  //Send a confirmation email
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.email',
      port: 465,
      auth: {
        user: '[USERNAME]',
        pass: '[PASSWORD]',
      },
    });
    // If a proper SMTP server is configured, this line could be uncommented
    // await transporter.sendMail({
    //     from: from,
    //     to: to,
    //     subject: subject,
    //     html: body,
    // })
  } catch (e) {
    throw new SendEmailError();
  }
}

export default emailSender;
