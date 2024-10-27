import { User } from "./types";

//user 
export type MessageResponse = {
  success: boolean;
  message: string;
};
export type AllUsersResponse = {
  success: boolean;
  users: User[];
};
export type UserResponse = {
  success: boolean;
  user: User;
};
export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};

