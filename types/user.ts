export interface User {
    id: string
    name: string
    department: string
    email: string
    location: string
    status: "active" | "in-active" | "suspended" | "other"
  }