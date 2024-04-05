const typeDefs = `#graphql
  type User {
    id: ID!
    userName: String!
    firstName: String
    lastName: String
    birthDate: String
    travelingDates: String
    travelingDestinations: String
    hobbies: String
    aboutYourSelf: String
    hometown: String
    birthDate: String
    public_id: String
    likes: String
    requests: String
    connections: String
    aboutYourself: String
    travelingDates: String
    travelingDestinations: String
    userPicture: String
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
    email: String
    userName: String
    password: String
  }

  # input updateUser {
  # firstName: String
  # lastName: String
  # birthDate: String
  # hometown: String
  # travelingDates: String
  # travelingDestinations: String
  # }
  
  type DeleteUser {
    message: String!
    user: User
  }
  

  
  type Mutation {
    updateUserInformation(email: String!, input: UpdateUserInformation!): User
    updateUserTravelingDates(id: ID!, travelingDates: String): successMessage
    signup(input: NewUserInput!): User
    login(email: String!, password: String!): User
    logout: successMessage
    deleteUser(email: String!): DeleteUser!
    # completeUserSignup(input: updateUser!): User
    
  }

  input UpdateUserInformation {

    firstName: String
    lastName: String

}
`;

export default typeDefs;
