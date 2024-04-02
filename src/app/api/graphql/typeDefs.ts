const typeDefs = `#graphql
  type User {
    id: ID!
    password: String!
    firstName: String
    lastName: String
    email: String!
    userName: String!
    hometown: String
    # birthDate: Date!
    public_id: String!
    likes: String!
    requests: String!
    connections: String!
    aboutYourself: String!
    travelingDates: String!
    travelingDestinations: String!
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
    email: String!
    userName: String!
    password: String!
  }

  input updateUser {
  firstName: String
  lastName: String
  birthDate: String
  hometown: String
  travelingDates: String
  travelingDestinations: String
  }
  
  input updateUserInformation {
  firstName: String
  lastName: String
  birthDate: String
  hometown: String
  travelingDates: String
  travelingDestinations: String
  }
  
  type Mutation {
    updateUserInformation(id: ID!, input: updateUserInformation!): User
    updateUserTravelingDates(id: ID!, travelingDates: String): successMessage
    signup(input: NewUserInput!): User
    login(email: String!, password: String!): User
    logout: successMessage
    deleteUser(id: ID!): successMessage
    completeUserSignup(input: updateUser!): User
  }
`;

export default typeDefs;
