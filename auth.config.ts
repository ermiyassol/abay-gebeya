import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import decrypt from "./utils/decrypt";
import axiosHelper from "./utils/axiosHelper";
import { getLoggedInUserSession } from "./utils/backendEndpoints/route";
import { HierarchiesWithPermission } from "./types/hierarchiesWithPermissions";
import jwt from "jsonwebtoken";

export const authConfig = {
  providers: [
    // Commenting out the provider since we don't want authentication
    credentials({
      credentials: {
        type: {},
        data: {},
      },
      authorize: async (credentials: any): Promise<any> => {
        const { key, data } = credentials;
        let postData = JSON.parse(data);
        const response = await axiosHelper.post(
          `${process.env.NEXT_ABAY_GEBEYA_BE}${
            key == "SIGN_IN" ? "auth/authenticate" : "auth/register"
          }`,
          postData
        );
        if ("data" in response && response.data) {
          return {
            accessToken:  response.data?.token,
            firstname: response.data?.userData?.firstname,
            lastname: response.data.userData?.lastname,
            email: response.data.userData?.email,
            phoneNumber: response.data.userData?.phoneNumber,
            role: response.data.userData?.role,
            verified: response.data.userData?.verified,
            blocked: response.data.userData?.blocked
              }
        } else {
          console.log("ERROR - ", response);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token-abay-gebeya`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url-abay-gebeya`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token-abay-gebeya`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/", 
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // Disable the JWT callback logic
      if (user) {
        token.user = { ...user };
      }
      return token;
    },
    session: ({ session, token }: any) => {
      if (token.user) {
          session.user = token.user;
      } else {
        session = null;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
} satisfies NextAuthConfig;
