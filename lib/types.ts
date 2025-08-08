export type User = {
  id: string
  clerkUserId: string
  name: string
  email: string
  avatarUrl: string | null
}

export type ExpectationWithUser = {
  id: string
  title: string
  estimatedCompletion: Date
  isDone: boolean
  createdAt: Date
  doneAt: Date | null
  updatedAt: Date
  user: User
}
