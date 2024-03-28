const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    userName: String!
    password: String!
    firstName: String
    lastName: String
    homeTown: String

  }
  type successMessage{
    message: String!
  }
  type Query {
    users: [User]
    user: User
  }
  input NewUserInput {
    email: String!
    userName: String!
    password: String!
  }
  input updateUser {
  firstName: String
  lastName: String
  birthDate: String
  hometown: String
  travelDates: String
  favDestinations: String
  }
  input updateUserInformation {
  firstName: String
  lastName: String
  birthDate: String
  hometown: String
  travelDates: String
  favDestinations: String
  }
  

  type Mutation {
    createUser(input: NewUserInput!): User
    # createUser(email: String, userName: String, password: String): User
    updateUsersEmail(id: ID!, email: String!): User
    signup(input: NewUserInput!): User
    completeUserSignup(input: updateUser!): User
    updateUserInformation(id: ID!, input: updateUserInformation!): User
    updateUserTravelDates(id: ID!, travelDates: String): successMessage
  }
`;

export default typeDefs;
