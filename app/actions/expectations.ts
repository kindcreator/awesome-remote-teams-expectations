'use server'

// Stub implementations for TDD Red Phase
// These will be properly implemented in the Green Phase

export async function addExpectation(data: {
  title: string
  estimatedCompletion: Date
}) {
  throw new Error('Not implemented')
}

export async function updateExpectation(data: {
  id: string
  title?: string
  estimatedCompletion?: Date
}) {
  throw new Error('Not implemented')
}

export async function deleteExpectation(id: string) {
  throw new Error('Not implemented')
}

export async function markExpectationAsDone(id: string) {
  throw new Error('Not implemented')
}

export async function getUserActiveExpectation() {
  throw new Error('Not implemented')
}