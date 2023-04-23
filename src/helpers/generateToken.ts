// generate a token from jwt
import jwt from 'jsonwebtoken';

export default (user: any) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_JWT as string,
    { expiresIn: '24h', algorithm: 'HS256' }
  );
  return token;
};
