import { buildTopicBrief, TOPIC_LIMITS, validateTopic } from "./topic.js";

const form = document.querySelector("#topic-form");
const topicInput = document.querySelector("#topic-input");
const topicError = document.querySelector("#topic-error");
const topicCount = document.querySelector("#topic-count");
const resultCard = document.querySelector("#topic-result");
const resultTitle = document.querySelector("#result-title");
const resultPromise = document.querySelector("#result-promise");
const resultQuestion = document.querySelector("#result-question");

function updateCount() {
  topicCount.textContent = `${topicInput.value.length}/${TOPIC_LIMITS.max}`;
}

function showError(message) {
  topicError.textContent = message;
  topicInput.setAttribute("aria-invalid", "true");
  resultCard.hidden = true;
}

function clearError() {
  topicError.textContent = "";
  topicInput.removeAttribute("aria-invalid");
}

function renderBrief(brief) {
  resultTitle.textContent = brief.title;
  resultPromise.textContent = brief.promise;
  resultQuestion.textContent = brief.openingQuestion;
  resultCard.hidden = false;
}

topicInput.addEventListener("input", () => {
  updateCount();

  if (topicInput.getAttribute("aria-invalid") === "true") {
    const validation = validateTopic(topicInput.value);

    if (validation.isValid) {
      clearError();
    }
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const validation = validateTopic(topicInput.value);

  if (!validation.isValid) {
    showError(validation.message);
    topicInput.focus();
    return;
  }

  clearError();
  renderBrief(buildTopicBrief(validation.topic));
});

updateCount();
