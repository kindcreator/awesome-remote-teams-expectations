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
