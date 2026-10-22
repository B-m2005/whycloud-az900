import { describe, expect, it } from "vitest";
import { answerShortcut, shuffleOptions } from "@/lib/quiz-controls";
import { QUESTIONS } from "@/lib/questions";

describe("quiz controls", () => {
  it("shuffles a copy without changing source options", () => {
    const original = Object.freeze(["one", "two", "three", "four"]);
    expect(shuffleOptions(original, () => 0)).toEqual(["two", "three", "four", "one"]);
    expect(original).toEqual(["one", "two", "three", "four"]);
  });
  it("preserves the correct answer text in all 25 shuffled questions", () => {
    expect(QUESTIONS).toHaveLength(25);
    for (const q of QUESTIONS) {
      expect(shuffleOptions(q.options, () => 0).filter((option) => option === q.correctAnswer)).toHaveLength(1);
    }
  });
  const event = { key: "A", ctrlKey: false, altKey: false, metaKey: false };
  it("maps A–D to the four displayed positions", () => {
    expect(["A", "b", "C", "d"].map((key) => answerShortcut({ ...event, key }, false, false))).toEqual([0, 1, 2, 3]);
    expect(answerShortcut({ ...event, key: "e" }, false, false)).toBeNull();
  });
  it("ignores shortcuts while editing", () => expect(answerShortcut(event, false, true)).toBeNull());
  it("ignores shortcuts after an answer", () => expect(answerShortcut(event, true, false)).toBeNull());
  for (const modifier of ["ctrlKey", "altKey", "metaKey"] as const) {
    it(`ignores ${modifier}`, () => expect(answerShortcut({ ...event, [modifier]: true }, false, false)).toBeNull());
  }
});