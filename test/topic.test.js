import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTopicBrief, normalizeTopic, validateTopic } from "../src/topic.js";

describe("normalizeTopic", () => {
  it("trims and collapses whitespace", () => {
    assert.equal(
      normalizeTopic("  audience   growth\nfor indie podcasts  "),
      "audience growth for indie podcasts",
    );
  });
});

describe("validateTopic", () => {
  it("requires a non-empty topic", () => {
    assert.deepEqual(validateTopic("   "), {
      isValid: false,
      message: "Enter a podcast topic to continue.",
      topic: "",
    });
  });

  it("rejects very short topics", () => {
    assert.deepEqual(validateTopic("AI"), {
      isValid: false,
      message: "Use at least 3 characters for the topic.",
      topic: "AI",
    });
  });

  it("accepts a focused topic", () => {
    assert.deepEqual(validateTopic("Local food history"), {
      isValid: true,
      message: "",
      topic: "Local food history",
    });
  });
});

describe("buildTopicBrief", () => {
  it("builds listener-facing starter copy from the topic", () => {
    assert.deepEqual(buildTopicBrief("Sustainable travel for families"), {
      title: "Sustainable travel for families",
      promise:
        "Help listeners understand sustainable travel for families through clear context, practical takeaways, and memorable stories.",
      openingQuestion:
        "What should listeners know first about sustainable travel for families?",
    });
  });
});
