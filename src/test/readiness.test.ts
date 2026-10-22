import { describe, it, expect } from "vitest";
import { domainStats, readinessScore } from "@/lib/readiness";
import { QUESTIONS } from "@/lib/questions";

describe("readiness score", () => {
  it("includes both batches after the original ten questions", () => {
    expect(QUESTIONS.map((q) => q.id)).toEqual(Array.from({ length: 20 }, (_, i) => String(i + 1)));
    expect(QUESTIONS.every((q) => q.answer >= 0 && q.answer < q.options.length)).toBe(true);
  });
  it("uses the expanded domain totals for coverage", () => {
    const stats = domainStats(QUESTIONS.map((q) => ({ question_id: q.id, domain: q.domain, is_correct: true })));
    expect(stats.map((s) => s.attempts)).toEqual([7, 10, 3]);
    expect(stats.map((s) => s.coverage)).toEqual([1, 1, 1]);
  });
  it("is 0 with no attempts", () => expect(readinessScore([])).toBe(0));
  it("is 100 when every question answered correctly", () => {
    expect(readinessScore(QUESTIONS.map((q) => ({ question_id: q.id, domain: q.domain, is_correct: true })))).toBe(100);
  });
  it("is 0 when every answer is wrong", () => {
    expect(readinessScore(QUESTIONS.map((q) => ({ question_id: q.id, domain: q.domain, is_correct: false })))).toBe(0);
  });
});
