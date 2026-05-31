import { DEFAULT_DURATION_MINUTES, parseDurationMinutes } from "./duration.js";
import { validateTopic } from "./topic.js";

export const STEPS = ["topic", "duration", "outline"];

export function createSession() {
  return {
    step: "topic",
    topic: "",
    durationMinutes: DEFAULT_DURATION_MINUTES,
  };
}

export function getStepIndex(step) {
  const index = STEPS.indexOf(step);

  if (index === -1) {
    throw new RangeError(`Unknown step: ${step}`);
  }

  return index;
}

export function canAdvance(session) {
  if (session.step === "topic") {
    return validateTopic(session.topic).isValid;
  }

  if (session.step === "duration") {
    try {
      parseDurationMinutes(session.durationMinutes);
      return Boolean(validateTopic(session.topic).isValid);
    } catch {
      return false;
    }
  }

  return false;
}

export function advanceSession(session) {
  const stepIndex = getStepIndex(session.step);

  if (stepIndex >= STEPS.length - 1) {
    return session;
  }

  if (!canAdvance(session)) {
    throw new Error(`Cannot advance from step "${session.step}".`);
  }

  return {
    ...session,
    step: STEPS[stepIndex + 1],
  };
}

export function goToStep(session, step) {
  if (!STEPS.includes(step)) {
    throw new RangeError(`Unknown step: ${step}`);
  }

  return {
    ...session,
    step,
  };
}

export function updateSessionTopic(session, topic) {
  return {
    ...session,
    topic: validateTopic(topic).topic,
  };
}

export function updateSessionDuration(session, durationMinutes) {
  return {
    ...session,
    durationMinutes: parseDurationMinutes(durationMinutes),
  };
}
