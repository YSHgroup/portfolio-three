import type { PrerenderData } from "../types";

export const getPrerenderedTranslations = (): Record<string, string> => {
  const script = document.getElementById("prerender-data");
  if (!script) return {};

  try {
    const data: PrerenderData = JSON.parse(script.textContent || "{}");
    return data.translations || {};
  } catch (err) {
    console.error("Failed to parse prerendered translations:", err);
    return {};
  }
};
