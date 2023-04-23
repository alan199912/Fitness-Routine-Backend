import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticationError } from 'apollo-server-express';
import { ExpressContext } from 'apollo-server-express';
import { User } from '../interfaces/user';
dotenv.config();

export default ({ req }: ExpressContext) => {
  const { authorization, client_id, client_secret } = req.headers;

  if (client_id !== process.env.CLIENT_ID || client_secret !== process.env.CLIENT_SECRET) {
    throw new AuthenticationError('Unauthorized');
  }

  if (authorization) {
    const token = authorization.split('Bearer ')[1];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_JWT as string) as User;
        return user;
      } catch (error) {
        console.log(error);
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};
