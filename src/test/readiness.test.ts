import { describe, it, expect } from "vitest";
import { readinessScore } from "@/lib/readiness";
import { QUESTIONS } from "@/lib/questions";

describe("readiness score", () => {
  it("is 0 with no attempts", () => expect(readinessScore([])).toBe(0));
  it("is 100 when every question answered correctly", () => {
    expect(readinessScore(QUESTIONS.map((q) => ({ question_id: q.id, domain: q.domain, is_correct: true })))).toBe(100);
  });
  it("is 0 when every answer is wrong", () => {
    expect(readinessScore(QUESTIONS.map((q) => ({ question_id: q.id, domain: q.domain, is_correct: false })))).toBe(0);
  });
});
