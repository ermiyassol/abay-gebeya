import NextAuth, { User } from "next-auth";
import { HierarchiesWithPermission } from "./hierarchiesWithPermissions";
import { RolesType } from "./enums/roleEnums";
type DomainsList = {
  hierarchyName: string;
  domain: string;
  domainUrl: string;
};
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's details. */
      accessToken: string;
      id: string;
      firstname: string;
      lastname: string;
      email: string;
      phoneNumber: string;
      role: RolesType;
      verified: boolean;
      blocked: boolean;
    };
  }

  interface User {
    accessToken: string;
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    role: RolesType;
    verified: boolean;
    blocked: boolean;
  }
}

export interface AdapterUser extends User {
  id: string;
  username: string;
  emailVerified: Date | null;
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: {
      accessToken: string;
      id: string;
      firstname: string;
      lastname: string;
      email: string;
      phoneNumber: string;
      role: RolesType;
      verified: boolean;
      blocked: boolean;
    };
  }
}

export interface GetQueryParams {
  search: string | null;
  featured: string;
  page: number | null;
  pageSize: number | null;
  sort: string | null;
}

export interface GetResponseType {
  content: any[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
