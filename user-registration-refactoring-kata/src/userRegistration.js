import nodemailer from 'nodemailer';
import { StatusCodes } from 'http-status-codes';

import userRepository from './user_orm_repository';
import InvalidPasswordError from './InvalidPasswordError';
import EmailAlreadyInUseError from './EmailAlreadyInUseError';

async function createUser(res, password, name, email) {
  if (password.length <= 8 || !password.includes('_')) {
    throw new InvalidPasswordError();
  }
  if (userRepository.findByEmail(email) !== undefined) {
    throw new EmailAlreadyInUseError();
  }

  const user = {
    id: Math.floor(Math.random() * 99999),
    name: name,
    email: email,
    password: password,
  };

  userRepository.save(user);

  //Send a confirmation email
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.email',
    port: 465,
    auth: {
      user: '[USERNAME]',
      pass: '[PASSWORD]',
    },
  });
  // If a proper SMTP server is configured, this line could be uncommented
  /**
     await transporter.sendMail({
    from: "noreply@codium.team",
    to: email,
    subject: "Welcome to Codium",
    html: "<h1>This is the confirmation email</h1>",
  });
     */

  return res.status(StatusCodes.CREATED).json({ user });
}

export default createUser;
