import express from 'express';
import { StatusCodes } from 'http-status-codes';
import createUser from './userRegistration';
import InvalidPasswordError from './InvalidPasswordError';
import EmailAlreadyInUseError from './EmailAlreadyInUseError';

const server = express();

server.use(express.json());

const post = (path, callback) =>
  server.post(path, (req, res, next) => callback(req, res).catch(next));

post('/users', async (req, res) => {
  return createUser(
    res,
    req.body.password,
    req.body.name,
    req.body.email
  ).catch((err) => {
    if (err instanceof InvalidPasswordError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json('The password is not valid!');
    } else if (err instanceof EmailAlreadyInUseError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json('The email is already in use');
    }
  });
});

server.use((error, request, response) => {
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
});

export default server;
