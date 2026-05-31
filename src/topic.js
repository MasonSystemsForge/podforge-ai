const MIN_TOPIC_LENGTH = 3;
const MAX_TOPIC_LENGTH = 160;

export function normalizeTopic(topic) {
  return topic.replace(/\s+/g, " ").trim();
}

export function validateTopic(topic) {
  const normalizedTopic = normalizeTopic(topic);

  if (!normalizedTopic) {
    return {
      isValid: false,
      message: "Enter a podcast topic to continue.",
      topic: normalizedTopic,
    };
  }

  if (normalizedTopic.length < MIN_TOPIC_LENGTH) {
    return {
      isValid: false,
      message: `Use at least ${MIN_TOPIC_LENGTH} characters for the topic.`,
      topic: normalizedTopic,
    };
  }

  if (normalizedTopic.length > MAX_TOPIC_LENGTH) {
    return {
      isValid: false,
      message: `Keep the topic under ${MAX_TOPIC_LENGTH} characters.`,
      topic: normalizedTopic,
    };
  }

  return {
    isValid: true,
    message: "",
    topic: normalizedTopic,
  };
}

export function buildTopicBrief(topic) {
  const normalizedTopic = normalizeTopic(topic);

  return {
    title: normalizedTopic,
    promise: `Help listeners understand ${normalizedTopic.toLowerCase()} through clear context, practical takeaways, and memorable stories.`,
    openingQuestion: `What should listeners know first about ${normalizedTopic.toLowerCase()}?`,
  };
}

export const TOPIC_LIMITS = {
  min: MIN_TOPIC_LENGTH,
  max: MAX_TOPIC_LENGTH,
};
