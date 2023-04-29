import { ExpressContext } from 'apollo-server-express';
import { AppDataSource } from '../../db/data-source';
import { Excersices } from '../../entities/Excersices';
import checkAuthentication from '../../middlewares/checkAuthentication';
import { Users } from '../../entities/Users';
import { Days } from '../../entities/Days';

const excersiceRepository = AppDataSource.getRepository(Excersices);
const userRepository = AppDataSource.getRepository(Users);
const dayRepository = AppDataSource.getRepository(Days);

export const excersicesResolvers = {
  Query: {
    excersices: async () => {
      try {
        const excersices = await excersiceRepository.find();

        return excersices;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createExcersice: async (
      _: any,
      { name, series, time, rest, weight, dayId }: any,
      context: ExpressContext
    ) => {
      try {
        const userAuthenticated = checkAuthentication(context);

        const user = await userRepository.findOne({
          where: { id: Number(userAuthenticated.id) },
          relations: ['days', 'days.excersice', 'excersice'],
        });

        console.log('[USER]', user);

        const day = await dayRepository.findOne({
          where: { id: dayId },
          relations: ['excersice'],
        });

        console.log('[DAY]', day);

        const excersice = new Excersices();
        excersice.name = name;
        excersice.series = series;
        excersice.time = time;
        excersice.rest = rest;
        excersice.weight = weight;

        if (day.excersice === null) {
          day.excersice = [];
        }

        if (day.excersice.find((d) => d.id === Number(dayId))) {
          day.excersice = day.excersice.filter((d) => d.id !== Number(dayId));
          return await dayRepository.save(day);
        }

        const excersiceSaved = await excersiceRepository.save(excersice);

        day.excersice.push(excersiceSaved);

        return excersiceSaved;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
