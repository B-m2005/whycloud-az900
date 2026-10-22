export function shuffleOptions(options: readonly string[], random = Math.random): string[] {
  const copy = [...options];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const current = copy[i];
    const replacement = copy[j];
    if (current === undefined || replacement === undefined) continue;
    copy[i] = replacement;
    copy[j] = current;
  }
  return copy;
}

export function answerShortcut(event: {
  key: string; ctrlKey: boolean; altKey: boolean; metaKey: boolean;
}, answered: boolean, editing: boolean): number | null {
  if (answered || editing || event.ctrlKey || event.altKey || event.metaKey) return null;
  const index = ["a", "b", "c", "d"].indexOf(event.key.toLowerCase());
  return index < 0 ? null : index;
}