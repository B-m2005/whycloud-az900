import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  Cloud, Github, LogOut, CheckCircle2, XCircle, ChevronDown, Lightbulb, Globe2,
  ArrowRight, RotateCcw, BarChart3, AlertTriangle,
} from "lucide-react";
import { supabase, type UserAttempt } from "@/lib/supabase";
import { QUESTIONS, DOMAINS, type Domain } from "@/lib/questions";
import { domainStats, readinessScore, type AttemptLite } from "@/lib/readiness";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CloudVibe AZ-900 Prep — Smart Azure Fundamentals Quiz" },
      { name: "description", content: "Practice AZ-900 with instant feedback, detailed explanations and African real-world analogies. Track your exam readiness." },
      { property: "og:title", content: "CloudVibe AZ-900 Prep" },
      { property: "og:description", content: "Smart AZ-900 quizzes with African real-world analogies and a readiness dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const LOCAL_KEY = "cloudvibe-attempts";

function Gauge({ value }: { value: number }) {
  const r = 18, c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-2" title="Exam readiness">
      <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
        <circle cx="22" cy="22" r={r} className="stroke-muted" strokeWidth="5" fill="none" />
        <circle cx="22" cy="22" r={r} className="stroke-primary transition-all duration-700" strokeWidth="5" fill="none"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (value / 100) * c} />
      </svg>
      <div className="leading-tight">
        <div className="font-display text-lg font-bold">{value}%</div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Readiness</div>
      </div>
    </div>
  );
}

function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [attempts, setAttempts] = useState<AttemptLite[]>([]);
  const [domain, setDomain] = useState<Domain | "All">("All");
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [showExp, setShowExp] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "INITIAL_SESSION") setUser(session?.user ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      try { setAttempts(JSON.parse(localStorage.getItem(LOCAL_KEY) ?? "[]")); } catch { setAttempts([]); }
      return;
    }
    supabase.from("user_attempts").select("question_id,domain,is_correct").eq("user_id", user.id)
      .then(({ data, error }) => {
        if (error) setDbError(error.message);
        else { setDbError(null); setAttempts(data ?? []); }
      });
  }, [user]);

  const pool = useMemo(() => (domain === "All" ? QUESTIONS : QUESTIONS.filter((q) => q.domain === domain)), [domain]);
  const q = pool[idx % pool.length]!;
  const stats = domainStats(attempts);
  const readiness = readinessScore(attempts);
  const totalCorrect = attempts.filter((a) => a.is_correct).length;

  async function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const a: AttemptLite = { question_id: q.id, domain: q.domain, is_correct: i === q.answer };
    const next = [...attempts, a];
    setAttempts(next);
    if (user) {
      const row: UserAttempt = { user_id: user.id, question_id: q.id, domain: q.domain, selected_index: i, is_correct: a.is_correct };
      const { error } = await supabase.from("user_attempts").insert(row);
      setDbError(error ? error.message : null);
    } else {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    }
  }

  function nextQ() { setPicked(null); setShowExp(false); setIdx((n) => n + 1); }

  async function reset() {
    setAttempts([]);
    if (user) await supabase.from("user_attempts").delete().eq("user_id", user.id);
    else localStorage.removeItem(LOCAL_KEY);
  }

  const login = () => supabase.auth.signInWithOAuth({ provider: "github", options: { redirectTo: window.location.origin } });

  return (
    <div className="min-h-screen bg-background bg-grid flex flex-col">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand shadow-glow">
              <Cloud className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">CloudVibe <span className="text-primary">AZ-900</span></span>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <Gauge value={readiness} />
            {user ? (
              <div className="flex items-center gap-2">
                {user.user_metadata?.avatar_url && <img src={user.user_metadata.avatar_url} alt="" className="h-8 w-8 rounded-full border border-border" />}
                <button onClick={() => supabase.auth.signOut()} className="btn-ghost" aria-label="Sign out"><LogOut className="h-4 w-4" /><span className="hidden sm:inline">Sign out</span></button>
              </div>
            ) : (
              <button onClick={login} className="btn-primary"><Github className="h-4 w-4" /><span className="hidden sm:inline">Login with GitHub</span></button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-8 lg:grid-cols-[1fr_340px]">
        <section>
          <div className="mb-4 flex flex-wrap gap-2">
            {(["All", ...DOMAINS.map((d) => d.name)] as const).map((d) => (
              <button key={d} onClick={() => { setDomain(d); setIdx(0); setPicked(null); setShowExp(false); }}
                className={domain === d ? "chip chip-active" : "chip"}>{d}</button>
            ))}
          </div>

          <div className="card-surface p-5 sm:p-7">
            <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
              <span className="rounded-full bg-accent px-2.5 py-1 font-medium text-accent-foreground">{q.domain}</span>
              <span>Question {(idx % pool.length) + 1} / {pool.length}</span>
            </div>
            <h2 className="font-display text-xl font-semibold leading-snug sm:text-2xl">{q.prompt}</h2>

            <div className="mt-6 grid gap-3">
              {q.options.map((opt, i) => {
                const state = picked === null ? "" : i === q.answer ? "option-correct" : i === picked ? "option-wrong" : "opacity-50";
                return (
                  <button key={i} onClick={() => choose(i)} disabled={picked !== null} className={`option ${state}`}>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border text-sm font-semibold">{String.fromCharCode(65 + i)}</span>
                    <span className="flex-1 text-left">{opt}</span>
                    {picked !== null && i === q.answer && <CheckCircle2 className="h-5 w-5 text-success" />}
                    {picked === i && i !== q.answer && <XCircle className="h-5 w-5 text-destructive" />}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-bottom-2">
                <p className={picked === q.answer ? "font-semibold text-success" : "font-semibold text-destructive"}>
                  {picked === q.answer ? "Correct! Nicely done." : `Not quite — the answer is ${String.fromCharCode(65 + q.answer)}.`}
                </p>

                <div className="rounded-xl border border-border bg-muted/40">
                  <button onClick={() => setShowExp((s) => !s)} className="flex w-full items-center justify-between px-4 py-3 font-medium">
                    <span className="flex items-center gap-2"><Lightbulb className="h-4 w-4 text-warning" />Detailed Explanation</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showExp ? "rotate-180" : ""}`} />
                  </button>
                  {showExp && (
                    <div className="space-y-3 border-t border-border px-4 py-4 text-sm">
                      <p><span className="font-semibold text-success">Why it's right: </span>{q.explanation}</p>
                      <ul className="space-y-1.5">
                        {q.options.map((o, i) => i !== q.answer && (
                          <li key={i} className="text-muted-foreground"><span className="font-semibold text-destructive">{String.fromCharCode(65 + i)}. {o}: </span>{q.whyWrong[i]}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm">
                  <div className="mb-1 flex items-center gap-2 font-semibold text-warning"><Globe2 className="h-4 w-4" />African Real-World Context Analogy</div>
                  <p>{q.analogy}</p>
                </div>

                <button onClick={nextQ} className="btn-primary w-full sm:w-auto">Next question <ArrowRight className="h-4 w-4" /></button>
              </div>
            )}
          </div>
        </section>

        <aside className="card-surface h-fit p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display font-semibold"><BarChart3 className="h-4 w-4 text-primary" />Progress Dashboard</h3>
            <button onClick={reset} className="text-muted-foreground hover:text-foreground" aria-label="Reset progress"><RotateCcw className="h-4 w-4" /></button>
          </div>
          <div className="mb-5 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-muted/50 p-2"><div className="font-display text-xl font-bold">{attempts.length}</div><div className="text-[11px] text-muted-foreground">Attempts</div></div>
            <div className="rounded-lg bg-muted/50 p-2"><div className="font-display text-xl font-bold">{attempts.length ? Math.round((totalCorrect / attempts.length) * 100) : 0}%</div><div className="text-[11px] text-muted-foreground">Accuracy</div></div>
            <div className="rounded-lg bg-muted/50 p-2"><div className="font-display text-xl font-bold text-primary">{readiness}%</div><div className="text-[11px] text-muted-foreground">Ready</div></div>
          </div>
          <div className="space-y-4">
            {stats.map((s) => (
              <div key={s.domain}>
                <div className="mb-1 flex justify-between text-sm"><span>{s.domain}</span><span className="text-muted-foreground">{s.accuracy}% · {s.correct}/{s.attempts}</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-brand transition-all duration-700" style={{ width: `${s.accuracy * s.coverage}%` }} /></div>
                <div className="mt-1 text-[11px] text-muted-foreground">Exam weight {DOMAINS.find((d) => d.name === s.domain)?.weight} · {Math.round(s.coverage * 100)}% covered</div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            {user ? "Attempts are saved to your account." : "Log in with GitHub to save attempts to your account. Progress is stored on this device for now."}
          </p>
          {dbError && <p className="mt-2 flex gap-1.5 text-xs text-destructive"><AlertTriangle className="h-3.5 w-3.5 shrink-0" />Couldn't sync: {dbError}</p>}
        </aside>
      </main>

      <footer className="border-t border-warning/40 bg-warning/10">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-4 text-center text-sm font-medium">
          <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
          Unofficial study tool built for #1MillionDevs Movement. Not affiliated with or endorsed by Microsoft.
        </div>
      </footer>
    </div>
  );
}
