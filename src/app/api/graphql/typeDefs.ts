const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    userName: String!
    firstName: String
    lastName: String
    birthDate: String
    travelingDates: String
    travelingDestinations: String
    hobbies: String
    aboutYourSelf: String
    hometown: String
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
  # travelingDates: String
  # travelingDestinations: String
  # }
  

  
  type Mutation {
    updateUserInformation(id: ID!, input: UpdateUserInformation!): User
    updateUserTravelingDates(id: ID!, travelingDates: String): successMessage
    signup(input: NewUserInput!): User
    login(email: String!, password: String!): User
    logout: successMessage
    deleteUser(id: ID!): successMessage
    # completeUserSignup(input: updateUser!): User
    
  }

  input UpdateUserInformation {

firstName: String
lastName: String

}
`;

export default typeDefs;
