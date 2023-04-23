import { AppDataSource } from '../../db/data-source';
import { Days } from '../../entities/Days';

const dayRepository = AppDataSource.getRepository(Days);

export const dayResolvers = {
  Query: {
    days: async () => {
      try {
        const days = await dayRepository.find();

        if (!days) {
          throw new Error('No days found');
        }

        return days;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
