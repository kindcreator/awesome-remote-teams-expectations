import type { User, Expectation } from "./types"

// Mock data for users. In a real app, this would come from a database.
export const users: User[] = [
  { id: "user-1", name: "Alex", avatarUrl: "/placeholder-user.jpg" },
  { id: "user-2", name: "Maria", avatarUrl: "/placeholder-user.jpg" },
  { id: "user-3", name: "David", avatarUrl: "/placeholder-user.jpg" },
  { id: "user-4", name: "Sophia", avatarUrl: "/placeholder-user.jpg" },
]

// Mock data for expectations.
export const expectations: Expectation[] = [
  {
    id: "exp-1",
    userId: "user-1",
    title: "Finalize Q3 marketing report",
    createdAt: "2025-08-04T09:00:00Z",
    estimatedCompletion: "2025-08-04T17:00:00Z",
    isDone: false,
    doneAt: null,
  },
  {
    id: "exp-2",
    userId: "user-2",
    title: "Develop the new authentication flow",
    createdAt: "2025-08-04T10:30:00Z",
    estimatedCompletion: "2025-08-05T15:00:00Z",
    isDone: false,
    doneAt: null,
  },
  {
    id: "exp-3",
    userId: "user-3",
    title: "Design the new dashboard components",
    createdAt: "2025-08-03T14:00:00Z",
    estimatedCompletion: "2025-08-04T18:00:00Z",
    isDone: true,
    doneAt: "2025-08-04T16:45:00Z",
  },
  {
    id: "exp-4",
    userId: "user-4",
    title: "Review and merge pull requests for the API gateway",
    createdAt: "2025-08-04T11:00:00Z",
    estimatedCompletion: "2025-08-04T16:00:00Z",
    isDone: false,
    doneAt: null,
  },
]
