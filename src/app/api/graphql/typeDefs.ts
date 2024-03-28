const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    userName: String!
    password: String!
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
  

  type Mutation {
    createUser(input: NewUserInput!): User
    # createUser(email: String, userName: String, password: String): User
    updateUsersEmail(id: ID!, email: String!): User
    signup(input: NewUserInput!): User
    completeUserSignup(input: updateUser!): User
    
  }
`;

export default typeDefs;
