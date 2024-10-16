export enum RolesType {
  USER = "USER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
}

export function getRolesTypeEnumAsArray<T>(): T[keyof T][] {
  return Object.values(RolesType) as T[keyof T][];
}
