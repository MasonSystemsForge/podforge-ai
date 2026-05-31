import {
  MAX_DURATION_MINUTES,
  MIN_DURATION_MINUTES,
  formatDurationLabel,
  parseDurationMinutes,
} from "./duration.js";
import { buildEpisodeOutline } from "./outline.js";
import {
  STEPS,
  advanceSession,
  createSession,
  goToStep,
  updateSessionDuration,
  updateSessionTopic,
} from "./session.js";
import { TOPIC_LIMITS, validateTopic } from "./topic.js";

const STEP_LABELS = {
  topic: "Topic",
  duration: "Duration",
  outline: "Outline",
};

let session = createSession();

const stepPanels = Object.fromEntries(
  STEPS.map((step) => [step, document.querySelector(`[data-step-panel="${step}"]`)]),
);
const stepper = document.querySelector("[data-stepper]");

const topicForm = document.querySelector("[data-topic-form]");
const topicInput = document.querySelector("[data-topic-input]");
const topicError = document.querySelector("[data-topic-error]");
const topicCount = document.querySelector("[data-topic-count]");

const durationForm = document.querySelector("[data-duration-form]");
const durationRange = document.querySelector("[data-duration-range]");
const durationNumber = document.querySelector("[data-duration-number]");
const durationValue = document.querySelector("[data-duration-value]");
const durationError = document.querySelector("[data-duration-error]");

const outlineTitle = document.querySelector("[data-outline-title]");
const outlineRuntime = document.querySelector("[data-outline-runtime]");
const outlinePromise = document.querySelector("[data-outline-promise]");
const outlineQuestion = document.querySelector("[data-outline-question]");
const segmentList = document.querySelector("[data-segment-list]");
const productionNotes = document.querySelector("[data-production-notes]");
const startOverButton = document.querySelector("[data-start-over-button]");

function renderStepper() {
  const currentIndex = STEPS.indexOf(session.step);

  stepper.innerHTML = STEPS.map((step, index) => {
    const state =
      index < currentIndex ? "complete" : index === currentIndex ? "current" : "upcoming";

    return `<li class="stepper-item stepper-item--${state}" aria-current="${state === "current" ? "step" : "false"}">${STEP_LABELS[step]}</li>`;
  }).join("");
}

function showStep(step) {
  for (const [name, panel] of Object.entries(stepPanels)) {
    panel.hidden = name !== step;
  }

  renderStepper();
}

function updateTopicCount() {
  topicCount.textContent = `${topicInput.value.length}/${TOPIC_LIMITS.max}`;
}

function showTopicError(message) {
  topicError.textContent = message;
  topicInput.setAttribute("aria-invalid", "true");
}

function clearTopicError() {
  topicError.textContent = "";
  topicInput.removeAttribute("aria-invalid");
}

function showDurationError(message) {
  durationError.textContent = message;
}

function clearDurationError() {
  durationError.textContent = "";
}

function setDuration(durationMinutes) {
  const duration = parseDurationMinutes(durationMinutes);
  const label = formatDurationLabel(duration);

  durationRange.value = String(duration);
  durationNumber.value = String(duration);
  durationValue.textContent = label;
  clearDurationError();

  return duration;
}

function renderOutline(outline) {
  outlineTitle.textContent = outline.title;
  outlineRuntime.textContent = `Target runtime: ${outline.targetRuntime}`;
  outlinePromise.textContent = outline.promise;
  outlineQuestion.textContent = outline.openingQuestion;

  segmentList.innerHTML = outline.segments
    .map(
      (segment) => `
        <li class="segment-card">
          <div class="segment-card__header">
            <h3>${segment.label}</h3>
            <span class="segment-card__time">${segment.minutes} min</span>
          </div>
          <ul>
            ${segment.talkingPoints.map((point) => `<li>${point}</li>`).join("")}
          </ul>
        </li>
      `,
    )
    .join("");

  productionNotes.innerHTML = outline.productionNotes
    .map((note) => `<li>${note}</li>`)
    .join("");
}

function syncFormValues() {
  topicInput.value = session.topic;
  updateTopicCount();
  setDuration(session.durationMinutes);
}

function renderSession() {
  syncFormValues();
  showStep(session.step);

  if (session.step === "outline") {
    renderOutline(buildEpisodeOutline(session.topic, session.durationMinutes));
  }
}

topicInput.addEventListener("input", () => {
  session = updateSessionTopic(session, topicInput.value);
  updateTopicCount();

  if (topicInput.getAttribute("aria-invalid") === "true" && validateTopic(topicInput.value).isValid) {
    clearTopicError();
  }
});

topicForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const validation = validateTopic(topicInput.value);

  if (!validation.isValid) {
    showTopicError(validation.message);
    topicInput.focus();
    return;
  }

  session = updateSessionTopic(session, validation.topic);
  clearTopicError();
  session = advanceSession(session);
  renderSession();
});

durationRange.addEventListener("input", (event) => {
  try {
    session = updateSessionDuration(session, event.target.value);
    setDuration(session.durationMinutes);
  } catch (error) {
    showDurationError(error.message);
  }
});

durationNumber.addEventListener("input", (event) => {
  try {
    session = updateSessionDuration(session, event.target.value);
    setDuration(session.durationMinutes);
  } catch (error) {
    showDurationError(error.message);
  }
});

durationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    session = updateSessionDuration(session, durationNumber.value);
    session = advanceSession(session);
    renderSession();
  } catch (error) {
    showDurationError(error.message);
  }
});

document.querySelectorAll("[data-back-button]").forEach((button) => {
  button.addEventListener("click", () => {
    if (session.step === "duration") {
      session = goToStep(session, "topic");
    } else if (session.step === "outline") {
      session = goToStep(session, "duration");
    }

    renderSession();
  });
});

startOverButton.addEventListener("click", () => {
  session = createSession();
  clearTopicError();
  clearDurationError();
  renderSession();
  topicInput.focus();
});

durationRange.min = String(MIN_DURATION_MINUTES);
durationRange.max = String(MAX_DURATION_MINUTES);
durationNumber.min = String(MIN_DURATION_MINUTES);
durationNumber.max = String(MAX_DURATION_MINUTES);

renderSession();
