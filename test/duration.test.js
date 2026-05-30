import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  DEFAULT_DURATION_MINUTES,
  MAX_DURATION_MINUTES,
  MIN_DURATION_MINUTES,
  formatDurationLabel,
  parseDurationMinutes
} from "../src/duration.js";

describe("duration selection", () => {
  it("sets the supported duration bounds", () => {
    assert.equal(MIN_DURATION_MINUTES, 1);
    assert.equal(MAX_DURATION_MINUTES, 30);
    assert.equal(DEFAULT_DURATION_MINUTES, 15);
  });

  it("accepts whole-minute durations from 1 to 30", () => {
    assert.equal(parseDurationMinutes("1"), 1);
    assert.equal(parseDurationMinutes(15), 15);
    assert.equal(parseDurationMinutes("30"), 30);
  });

  it("rejects durations below 1 minute", () => {
    assert.throws(() => parseDurationMinutes(0), /between 1 and 30/);
  });

  it("rejects durations above 30 minutes", () => {
    assert.throws(() => parseDurationMinutes(31), /between 1 and 30/);
  });

  it("rejects partial-minute durations", () => {
    assert.throws(() => parseDurationMinutes(4.5), /whole number/);
  });

  it("formats valid durations for display", () => {
    assert.equal(formatDurationLabel(7), "7 min");
  });
});
