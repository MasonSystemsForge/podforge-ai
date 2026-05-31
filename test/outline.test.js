import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  allocateSegmentDurations,
  buildEpisodeOutline,
  buildSegmentTalkingPoints,
} from "../src/outline.js";

describe("allocateSegmentDurations", () => {
  it("allocates minutes that sum to the target runtime", () => {
    for (const duration of [1, 5, 15, 30]) {
      const segments = allocateSegmentDurations(duration);
      const total = segments.reduce((sum, segment) => sum + segment.minutes, 0);

      assert.equal(total, duration, `expected ${duration} minutes total`);
      assert.equal(segments.length, 6);
    }
  });

  it("gives every segment at least one minute for longer episodes", () => {
    const segments = allocateSegmentDurations(15);

    assert.ok(segments.every((segment) => segment.minutes >= 1));
  });
});

describe("buildSegmentTalkingPoints", () => {
  it("returns topic-aware prompts for each segment", () => {
    const points = buildSegmentTalkingPoints("Remote work habits", "act-2");

    assert.match(points[0], /remote work habits/i);
    assert.ok(points.length >= 2);
  });
});

describe("buildEpisodeOutline", () => {
  it("builds a production-ready outline from topic and duration", () => {
    const outline = buildEpisodeOutline("Local food history", 12);

    assert.equal(outline.title, "Local food history");
    assert.equal(outline.targetRuntime, "12 min");
    assert.equal(outline.segments.length, 6);
    assert.equal(
      outline.segments.reduce((sum, segment) => sum + segment.minutes, 0),
      12,
    );
    assert.ok(outline.productionNotes.length >= 2);
    assert.match(outline.openingQuestion, /local food history/i);
  });
});
