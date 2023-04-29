import { gql } from 'apollo-server-express';

export const excersicesTypeDefs = gql`
  type Query {
    excersices: [Excersice]
  }

  type Mutation {
    createExcersice(
      name: String!
      series: Int!
      time: Int!
      rest: Int!
      weight: Int!
      dayId: ID!
    ): Excersice!
  }

  type Excersice {
    id: ID!
    name: String!
    series: Int!
    time: Int!
    rest: Int!
    weight: Int!
    day: Day!
    createdAt: String!
    updatedAt: String!
  }
`;
