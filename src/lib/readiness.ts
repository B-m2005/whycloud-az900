import { DOMAINS, QUESTIONS, type Domain } from "./questions";

export interface AttemptLite {
  question_id: string;
  domain: string;
  is_correct: boolean;
}

export interface DomainStat {
  domain: Domain;
  attempts: number;
  correct: number;
  accuracy: number; // 0-100
  coverage: number; // 0-1 share of distinct questions attempted
}

export function domainStats(attempts: AttemptLite[]): DomainStat[] {
  return DOMAINS.map(({ name }) => {
    const list = attempts.filter((a) => a.domain === name);
    const correct = list.filter((a) => a.is_correct).length;
    const total = QUESTIONS.filter((q) => q.domain === name).length;
    const distinct = new Set(list.map((a) => a.question_id)).size;
    return {
      domain: name,
      attempts: list.length,
      correct,
      accuracy: list.length ? Math.round((correct / list.length) * 100) : 0,
      coverage: total ? Math.min(1, distinct / total) : 0,
    };
  });
}

/** Readiness = average over domains of accuracy weighted by question coverage. */
export function readinessScore(attempts: AttemptLite[]): number {
  const stats = domainStats(attempts);
  const sum = stats.reduce((s, d) => s + d.accuracy * d.coverage, 0);
  return Math.round(sum / stats.length);
}
