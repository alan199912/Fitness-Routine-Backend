import { gql } from 'apollo-server-express';

export const excersicesTypeDefs = gql`
  type Query {
    excersices: String
  }

  type Mutation {
    createExcersice: String
  }
`;
