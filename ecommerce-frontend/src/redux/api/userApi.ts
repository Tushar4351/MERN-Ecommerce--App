import {
  AllUsersResponse,
  DeleteUserRequest,
  MessageResponse,
  UserResponse,
} from "@/types/api-types";
import { User, UserSignin } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
    credentials: "include",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    singup: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),

    signin: builder.mutation<MessageResponse, UserSignin>({
      query: (user) => ({
        url: "signin",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
      query: ({ userId, adminUserId }) => ({
        url: `${userId}?id=${adminUserId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    allUsers: builder.query<AllUsersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["users"],
    }),
    checkAuth: builder.query<UserResponse, void>({
      query: () => "check-auth", 
      providesTags: ["users"],
    }),
  }),
});

export const getUser = async (id: string): Promise<UserResponse> => {
  try {
    const { data } = await axios.get<UserResponse>(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );
    return data;
  } catch (error) {
    // Log the error for debugging purposes
    if (axios.isAxiosError(error)) {
      console.error("Error fetching user:", error.message);
      // Optionally, you can throw a more specific error or handle it differently
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; // Re-throw the error for further handling
  }
};

// export const checkAuth = async (token: string): Promise<UserResponse> => {
//   try {
//     const { data } = await axios.get<UserResponse>(
//       `${import.meta.env.VITE_SERVER}/api/v1/user/check-auth/${token}`
//     );
//     return data;
//   } catch (error) {
//     // Log the error for debugging purposes
//     if (axios.isAxiosError(error)) {
//       console.error("Error fetching user:", error.message);
//       // Optionally, you can throw a more specific error or handle it differently
//     } else {
//       console.error("Unexpected error:", error);
//     }
//     throw error; // Re-throw the error for further handling
//   }
// };

export const {
  useSingupMutation,
  useAllUsersQuery,
  useDeleteUserMutation,
  useSigninMutation,
  useCheckAuthQuery,
} = userAPI;
