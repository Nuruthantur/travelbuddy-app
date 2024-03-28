export default interface User {
  _id: string;
  userName: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  public_id?: string;
  likes?: string;
  requests?: string;
  connections?: string;
  hometown?: string;
  aboutYourself?: string;
  travelingDates?: string;
  travelingDestinations?: string;
  agreeToTerms?: boolean;
  userPicture?: string;
}
