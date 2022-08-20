const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tech {
    _id: ID!
    name: String!
  }

  type Adoption {
    _id: ID!
    tech1: String!
    tech2: String!
    tech1_votes: Int
    tech2_votes: Int
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    # no password field, need to keep passwords hidden
  }
  type TokenUser {
    token: ID!
    user: User
  }
  type Dog{
    _id: ID!
    name: String
  }

  type Tomato {
    turtle: Turtle
    user: User
  }
  type Turtle{
    name: String
    attributes: [String]
  }

  type Query {
    tech: [Tech]
    adoption(_id: String): [Adoption]

    users: [User]
    user(_id: String!): User
  }
  me: User
    test: Dog
    tomatoMyself: Tomato
  }

  type Mutation {
    createAdoption(tech1: String!, tech2: String!): Adoption
    createVote(_id: String!, techNum: Int!): Adoption

    createUser(name: String!, email: String!, password: String!): TokenUser
    createUserNoToken(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): TokenUser
  }
`;

module.exports = typeDefs;
