/* eslint-disable @typescript-eslint/no-explicit-any */
import { HealthCheckRating } from "./types";

// Helper function for exhaustive type checking
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// To check valid date
export const isDate = (date: any): boolean => {
  // Pattern for date (YYYY-MM-DD)
  const re = /(^\w{4})-(\w{2})-(\w{2}$)/;
  const resultArray = date.match(re);
  if (!resultArray) {
    return false;
  }
  return Boolean(Date.parse(date));
};

// Type guard, health check rating validation function
export const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};