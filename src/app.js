import {
  DEFAULT_DURATION_MINUTES,
  MAX_DURATION_MINUTES,
  MIN_DURATION_MINUTES,
  formatDurationLabel,
  parseDurationMinutes
} from "./duration.js";

const form = document.querySelector("[data-episode-form]");
const durationRange = document.querySelector("[data-duration-range]");
const durationNumber = document.querySelector("[data-duration-number]");
const durationValue = document.querySelector("[data-duration-value]");
const statusMessage = document.querySelector("[data-status-message]");
const summary = document.querySelector("[data-episode-summary]");

function setDuration(durationMinutes) {
  const duration = parseDurationMinutes(durationMinutes);
  const label = formatDurationLabel(duration);

  durationRange.value = String(duration);
  durationNumber.value = String(duration);
  durationValue.textContent = label;
  statusMessage.textContent = "";

  return duration;
}

function reportDurationError(error) {
  statusMessage.textContent = error.message;
  summary.hidden = true;
}

durationRange.min = String(MIN_DURATION_MINUTES);
durationRange.max = String(MAX_DURATION_MINUTES);
durationNumber.min = String(MIN_DURATION_MINUTES);
durationNumber.max = String(MAX_DURATION_MINUTES);

setDuration(DEFAULT_DURATION_MINUTES);

durationRange.addEventListener("input", (event) => {
  try {
    setDuration(event.target.value);
  } catch (error) {
    reportDurationError(error);
  }
});

durationNumber.addEventListener("input", (event) => {
  try {
    setDuration(event.target.value);
  } catch (error) {
    reportDurationError(error);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const duration = setDuration(durationNumber.value);
    summary.textContent = `Episode duration selected: ${formatDurationLabel(duration)}.`;
    summary.hidden = false;
  } catch (error) {
    reportDurationError(error);
  }
});
