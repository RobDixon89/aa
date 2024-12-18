export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function highlightTitleWords(title: string): string {
  return title.replaceAll(/\*([^*]+)\*/g, "<span class='highlight'>$1</i>");
}

export function clamp(value: number, max: number): number {
  return Math.max(Math.min(value, max), 0);
}
