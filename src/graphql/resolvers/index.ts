import { dayResolvers } from './day';
import { excersicesResolvers } from './excersices';
import { usersResolvers } from './users';

export const resolvers = {
  Query: {
    ...excersicesResolvers.Query,
    ...usersResolvers.Query,
    ...dayResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...excersicesResolvers.Mutation,
  },
  Subscription: {},
};
