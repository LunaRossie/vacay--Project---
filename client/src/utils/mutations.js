import { gql } from '@apollo/client';

export const CREATE_ADOPTION = gql`
  mutation createAdoption($tech1: String!, $tech2: String!) {
    createAdoption(tech1: $tech1, tech2: $tech2) {
      _id
      tech1
      tech2
    }
  }
`;

export const CREATE_VOTE = gql`
  mutation createVote($_id: String!, $techNum: Int!) {
    createVote(_id: $_id, techNum: $techNum) {
      _id
      tech1
      tech2
      tech1_votes
      tech2_votes
    }
  }
`;

export const CREATE_USER = gql`
mutation createUser($name: String!, $email: String!, $password: String!,) {
  createUser(name: $name, email: $email, password: $password) {
    _id
    name
    email
  }
}
`;
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!,) {
  login(email: $email, password: $password) {
    token
    user{
    _id
    name
    email
    }
  }
}
`;
