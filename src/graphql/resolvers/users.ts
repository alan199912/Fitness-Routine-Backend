import { AppDataSource } from '../../db/data-source';
import { Users } from '../../entities/Users';
import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import generateToken from '../../helpers/generateToken';
import { CheckUserNameTaken, ChoiseDay, Login, Register, User } from '../../interfaces/user';
import { ExpressContext } from 'apollo-server-express';
import checkAuthentication from '../../middlewares/checkAuthentication';
import { Days } from '../../entities/Days';

const userRepository = AppDataSource.getRepository(Users);
const dayRepository = AppDataSource.getRepository(Days);

export const usersResolvers = {
  Query: {
    users: async () => {
      return await userRepository.find({
        relations: {
          days: true,
        },
      });
    },
    checkUsernameTaken: async (_: User, { username }: CheckUserNameTaken) => {
      try {
        const user = await userRepository.findOne({
          where: { username },
        });

        if (user) {
          return true;
        }

        return false;
      } catch (error) {
        throw new Error(error);
      }
    },
    verifyToken: async (_: User, __: any, context: ExpressContext) => {
      try {
        const userAuthenticated = checkAuthentication(context);

        if (!userAuthenticated) {
          throw new UserInputError('User not authenticated');
        }

        const user = await userRepository.findOne({
          where: { id: +userAuthenticated.id },
        });

        return !!user;
      } catch (error) {
        return false;
      }
    },
    getUserById: async (_: User, { id }: { id: number }, context: ExpressContext) => {
      try {
        const userAuthenticated = checkAuthentication(context);
        console.log('[GET AUTH]', userAuthenticated);

        if (!userAuthenticated) {
          throw new UserInputError('User not authenticated');
        }

        if (+userAuthenticated.id !== +id) {
          throw new UserInputError('User not authorized');
        }

        const user = await userRepository.findOne({
          where: { id },
        });

        console.log('[GET USER]', user);

        if (!user) {
          throw new UserInputError('User not found');
        }

        console.log('[GET USER BY ID]', user);
        return user;
      } catch (error) {
        console.log('GET user by id error', error);
        throw new Error(error);
      }
    },
    getUser: async (_: User, __: any, context: ExpressContext) => {
      try {
        const userAuthenticated = checkAuthentication(context);

        if (!userAuthenticated) {
          throw new UserInputError('User not authenticated');
        }

        const user = await userRepository.findOne({
          where: { id: +userAuthenticated.id },
          relations: {
            days: true,
          },
        });

        if (!user) {
          throw new UserInputError('User not found');
        }

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    register: async (_: User, { username, email, password }: Register) => {
      try {
        const user = await userRepository.findOne({
          where: { email },
        });

        if (user) {
          throw new UserInputError('User already exists', {
            errors: {
              message: 'This email is already registered',
            },
          });
        }

        const newUser = new Users();
        newUser.username = username;
        newUser.email = email;

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        return await userRepository.save(newUser);
      } catch (error) {
        throw new Error(error);
      }
    },
    login: async (_: User, { email, password }: Login) => {
      try {
        const user = await userRepository.findOne({
          where: { email },
          select: ['id', 'email', 'password', 'username'],
        });

        if (!user) {
          throw new UserInputError('User not found', {
            errors: {
              message: 'User not found',
            },
          });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new UserInputError('Incorrect password', {
            errors: {
              message: 'Incorrect password',
            },
          });
        }

        const token = generateToken(user);

        return token;
      } catch (error) {
        throw new Error(error);
      }
    },
    // TODO: MOVE TO DAY RESOLVER
    choiseDay: async (_: User, { dayId }: ChoiseDay, context: ExpressContext) => {
      const userAuthenticated = checkAuthentication(context);

      if (!userAuthenticated) {
        throw new Error('User not authenticated');
      }

      try {
        const user = await userRepository.findOne({
          where: { id: Number(userAuthenticated.id) },
          relations: ['days'],
        });

        if (!user) {
          throw new UserInputError('User not found');
        }

        const day = await dayRepository.findOne({
          where: { id: dayId },
        });

        if (!day) {
          throw new UserInputError('Day not found');
        }

        if (user.days === null) {
          user.days = [];
        }

        if (user.days.find((d) => d.id === Number(dayId))) {
          user.days = user.days.filter((d) => d.id !== Number(dayId));
          return await userRepository.save(user);
        }

        user.days.push(
          await dayRepository.findOne({
            where: { id: dayId },
          })
        );

        return await userRepository.save(user);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
