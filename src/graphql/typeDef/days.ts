import { gql } from 'apollo-server-express';

export const daysTypeDefs = gql`
  type Query {
    days: [Day]
  }

  type Day {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
  }
`;
