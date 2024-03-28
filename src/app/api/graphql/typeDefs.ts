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
    getAllUsers: [User]
    users: [User]
    getUsersById(id: ID!): User

    testFunction: String
    getMe: User
    user: User
  }

  input NewUserInput {
    email: String!
    userName: String!
    password: String!
  }

  # input updateUser {
  # firstName: String
  # lastName: String
  # birthDate: String
  # hometown: String
  # travelDates: String
  # favDestinations: String
  # }
  
  input updateUserInformation {
  firstName: String
  lastName: String
  birthDate: String
  hometown: String
  travelDates: String
  favDestinations: String
  }
  
  type Mutation {
    updateUserInformation(id: ID!, input: updateUserInformation!): User
    updateUserTravelDates(id: ID!, travelDates: String): successMessage
    signup(input: NewUserInput!): User
    login(email: String!, password: String!): User
    logout: successMessage
    deleteUser(id: ID!): successMessage
    completeUserSignup(input: updateUser!): User
    
  }
`;

export default typeDefs;
