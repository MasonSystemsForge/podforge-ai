import { formatDurationLabel, parseDurationMinutes } from "./duration.js";
import { buildTopicBrief, normalizeTopic } from "./topic.js";

export const SEGMENT_BLUEPRINT = [
  { id: "cold-open", label: "Cold open", ratio: 0.08 },
  { id: "intro", label: "Intro", ratio: 0.1 },
  { id: "act-1", label: "Act 1 — Setup", ratio: 0.22 },
  { id: "act-2", label: "Act 2 — Development", ratio: 0.32 },
  { id: "act-3", label: "Act 3 — Payoff", ratio: 0.18 },
  { id: "close", label: "Close", ratio: 0.1 },
];

export function allocateSegmentDurations(totalMinutes) {
  const duration = parseDurationMinutes(totalMinutes);
  const weighted = SEGMENT_BLUEPRINT.map((segment) => ({
    ...segment,
    rawMinutes: duration * segment.ratio,
  }));

  const allocated = weighted.map((segment) => ({
    id: segment.id,
    label: segment.label,
    minutes: Math.floor(segment.rawMinutes),
    fraction: segment.rawMinutes - Math.floor(segment.rawMinutes),
  }));

  let remaining = duration - allocated.reduce((sum, segment) => sum + segment.minutes, 0);
  const byFraction = [...allocated].sort((left, right) => right.fraction - left.fraction);

  for (const segment of byFraction) {
    if (remaining === 0) {
      break;
    }

    segment.minutes += 1;
    remaining -= 1;
  }

  return allocated.map(({ id, label, minutes }) => ({ id, label, minutes }));
}

export function buildSegmentTalkingPoints(topic, segmentId) {
  const normalizedTopic = normalizeTopic(topic).toLowerCase();

  switch (segmentId) {
    case "cold-open":
      return [
        `Drop listeners into a concrete moment related to ${normalizedTopic}.`,
        "State the central question or tension in one sentence.",
      ];
    case "intro":
      return [
        `Introduce the episode promise around ${normalizedTopic}.`,
        "Preview the listener takeaway and why it matters now.",
      ];
    case "act-1":
      return [
        `Define key terms and context for ${normalizedTopic}.`,
        "Share one story or example that frames the stakes.",
      ];
    case "act-2":
      return [
        `Explore the main ideas, tradeoffs, or steps behind ${normalizedTopic}.`,
        "Include a practical takeaway listeners can apply immediately.",
      ];
    case "act-3":
      return [
        `Resolve the opening question with a clear point of view on ${normalizedTopic}.`,
        "Highlight one memorable insight or reframing.",
      ];
    case "close":
      return [
        "Summarize the listener promise in one sentence.",
        "Suggest one next step: subscribe, share, or explore a follow-up topic.",
      ];
    default:
      return [`Discuss ${normalizedTopic}.`];
  }
}

export function buildEpisodeOutline(topic, durationMinutes) {
  const brief = buildTopicBrief(topic);
  const duration = parseDurationMinutes(durationMinutes);
  const segments = allocateSegmentDurations(duration).map((segment) => ({
    ...segment,
    talkingPoints: buildSegmentTalkingPoints(brief.title, segment.id),
  }));

  return {
    title: brief.title,
    promise: brief.promise,
    openingQuestion: brief.openingQuestion,
    targetRuntime: formatDurationLabel(duration),
    segments,
    productionNotes: [
      "Record a scratch track and mark any sections that feel unnatural.",
      "Flag names, acronyms, or terms that need pronunciation notes.",
      `Target ${formatDurationLabel(duration)} total runtime; trim Act 2 first if the episode runs long.`,
    ],
  };
}
