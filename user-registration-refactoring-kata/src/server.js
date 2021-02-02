import express from 'express';
import { StatusCodes } from 'http-status-codes';
import createUser from './userRegistration';
import InvalidPasswordError from './InvalidPasswordError';
import EmailAlreadyInUseError from './EmailAlreadyInUseError';

const server = express();

server.use(express.json());

server.post('/users', (req, res) => {
  return createUser(req.body.password, req.body.name, req.body.email)
    .then((user) => {
      return res.status(StatusCodes.CREATED).json({ user });
    })
    .catch((err) => {
      if (err instanceof InvalidPasswordError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json('The password is not valid!');
      } else if (err instanceof EmailAlreadyInUseError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json('The email is already in use');
      }

      throw err;
    });
});

export default server;
