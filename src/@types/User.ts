export default interface User {
  _id: string;
  userName: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  // profilePicture?: { URL: string; public_Id: string };
  public_id?: string;
  hometown?: string;
  travelDates?: Date;
  favouriteLocations?: string;
  likes?: string;
  requests?: string;
  connections?: string;
}

export interface TestUser {
  _id: string;
  email: string;
  password: string;
  userName: string;
  favDestinations?: string;
}
