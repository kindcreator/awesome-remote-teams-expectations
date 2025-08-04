export type User = {
  id: string
  name: string
  avatarUrl: string
}

export type Expectation = {
  id: string
  userId: string
  title: string
  createdAt: string
  estimatedCompletion: string
  isDone: boolean
  doneAt: string | null
}
