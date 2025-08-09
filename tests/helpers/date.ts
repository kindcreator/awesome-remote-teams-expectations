/**
 * Test helper utilities for date manipulation
 */

/**
 * Creates a future date by adding days to the current date
 * @param days Number of days to add to current date
 * @returns Date object set to the specified number of days in the future
 */
export function daysFromNow(days: number): Date {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000)
}

/**
 * Creates a future date by adding hours to the current date
 * @param hours Number of hours to add to current date
 * @returns Date object set to the specified number of hours in the future
 */
export function hoursFromNow(hours: number): Date {
  return new Date(Date.now() + hours * 60 * 60 * 1000)
}

/**
 * Creates a past date by subtracting days from the current date
 * @param days Number of days to subtract from current date
 * @returns Date object set to the specified number of days in the past
 */
export function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000)
}