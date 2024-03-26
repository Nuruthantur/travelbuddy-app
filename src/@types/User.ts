// interface User {
//   _id: string;
//   userName: string;
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   birthDate: Date;
//   // profilePicture?: { URL: string; public_Id: string };
//   public_id?: string;
//   hometown?: string;
//   travelDates?: Date;
//   likes?: string;
//   requests?: string;
//   connections?: string;
// }

import { ObjectId } from "mongoose";

export interface User {
  _id: string;
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  // city: "",
  // state: "",
  aboutYourself: string;
  travelingDates: string;
  travelingDestinations: string;
  agreeToTerms: boolean;
  // favDestinations?: string;
}

export interface TestUser {
  _id: string;
  email: string;
  password: string;
  userName: string;
  favDestinations?: string;
}
