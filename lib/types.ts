export type User = {
  id: string
  name: string | null
  email: string | null
  avatarUrl: string | null
}

export type Expectation = {
  id: string
  title: string
  estimatedCompletion: string | Date
  isDone: boolean
  user: User
  createdAt?: string | Date
  doneAt?: string | Date | null
  updatedAt?: string | Date
}

export type ExpectationWithUser = Expectation
