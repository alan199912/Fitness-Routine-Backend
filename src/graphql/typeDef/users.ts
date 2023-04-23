import { gql } from 'apollo-server-express';

export const usersTypeDefs = gql`
  type Query {
    users: [User]
    checkUsernameTaken(username: String!): Boolean!
    verifyToken: Boolean!
    getUserById(id: ID!): User!
    getUser: User!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): String!
    choiseDay(dayId: ID!): User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    days: [Day]
    createdAt: String!
    updatedAt: String!
  }
`;
