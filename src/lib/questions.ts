import raw from "@/data/questions.json";

export type Domain = "Cloud Concepts" | "Azure Architecture and Services" | "Azure Management and Governance";

export const DOMAINS: { name: Domain; weight: string }[] = [
  { name: "Cloud Concepts", weight: "25–30%" },
  { name: "Azure Architecture and Services", weight: "35–40%" },
  { name: "Azure Management and Governance", weight: "30–35%" },
];

interface RawQuestion {
  id: number;
  domain: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  african_analogy: string;
}

export interface Question {
  id: string;
  domain: Domain;
  prompt: string;
  options: string[];
  answer: number;
  correctAnswer: string;
  explanation: string;
  analogy: string;
}

export const QUESTIONS: Question[] = (raw as RawQuestion[]).map((q) => ({
  id: String(q.id),
  domain: q.domain as Domain,
  prompt: q.question,
  options: q.options,
  answer: q.options.indexOf(q.correct_answer),
  correctAnswer: q.correct_answer,
  explanation: q.explanation,
  analogy: q.african_analogy,
}));
