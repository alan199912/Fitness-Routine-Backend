import { gql } from 'apollo-server-express';
import { daysTypeDefs } from './days';
import { excersicesTypeDefs } from './excersices';
import { usersTypeDefs } from './users';

const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`;

export const typeDefs = [rootTypeDefs, excersicesTypeDefs, usersTypeDefs, daysTypeDefs];
