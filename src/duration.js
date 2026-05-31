export const MIN_DURATION_MINUTES = 1;
export const MAX_DURATION_MINUTES = 30;
export const DEFAULT_DURATION_MINUTES = 15;

export function parseDurationMinutes(value) {
  if (value === null || value === undefined || value === "") {
    throw new RangeError("Choose a duration between 1 and 30 minutes.");
  }

  const duration = Number(value);

  if (!Number.isInteger(duration)) {
    throw new RangeError("Duration must be a whole number of minutes.");
  }

  if (duration < MIN_DURATION_MINUTES || duration > MAX_DURATION_MINUTES) {
    throw new RangeError("Choose a duration between 1 and 30 minutes.");
  }

  return duration;
}

export function formatDurationLabel(durationMinutes) {
  const duration = parseDurationMinutes(durationMinutes);
  return `${duration} min`;
}
