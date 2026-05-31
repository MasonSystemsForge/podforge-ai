import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  advanceSession,
  canAdvance,
  createSession,
  goToStep,
  updateSessionDuration,
  updateSessionTopic,
} from "../src/session.js";

describe("createSession", () => {
  it("starts on the topic step", () => {
    const session = createSession();

    assert.equal(session.step, "topic");
    assert.equal(session.topic, "");
    assert.equal(session.durationMinutes, 15);
  });
});

describe("session progression", () => {
  it("advances from topic to duration when the topic is valid", () => {
    let session = updateSessionTopic(createSession(), "Indie podcast growth");

    assert.equal(canAdvance(session), true);
    session = advanceSession(session);
    assert.equal(session.step, "duration");
  });

  it("advances from duration to outline when duration is valid", () => {
    let session = updateSessionTopic(createSession(), "Indie podcast growth");
    session = advanceSession(session);
    session = updateSessionDuration(session, 20);

    assert.equal(canAdvance(session), true);
    session = advanceSession(session);
    assert.equal(session.step, "outline");
  });

  it("does not advance from outline", () => {
    let session = updateSessionTopic(createSession(), "Indie podcast growth");
    session = advanceSession(session);
    session = advanceSession(session);

    assert.equal(session.step, "outline");
    assert.equal(canAdvance(session), false);
    assert.equal(advanceSession(session).step, "outline");
  });

  it("allows navigating back to earlier steps", () => {
    let session = updateSessionTopic(createSession(), "Indie podcast growth");
    session = advanceSession(session);
    session = advanceSession(updateSessionDuration(session, 10));

    session = goToStep(session, "topic");
    assert.equal(session.step, "topic");
  });
});
