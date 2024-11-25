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
