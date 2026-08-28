import { WidgetError } from "./errors";
import type { WidgetItem } from "./types";

const demoItems: WidgetItem[] = [
  { id: "activation-guide", title: "Complete your workspace setup", description: "Invite a teammate and connect your first integration.", actionLabel: "Open setup" },
  { id: "weekly-insight", title: "Your weekly insight is ready", description: "Activation increased in the synthetic demo workspace.", actionLabel: "View insight" },
];

const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function fetchItems(apiBaseUrl: string, apiKey: string, timeoutMs: number, onRetry: (attempt: number) => void): Promise<WidgetItem[]> {
  if (apiBaseUrl === "demo") {
    await wait(350);
    return demoItems;
  }
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/v1/widget/items`, {
        headers: { "X-Public-Key": apiKey, Accept: "application/json" },
        signal: controller.signal,
      });
      if (response.status === 401 || response.status === 403) throw new WidgetError("UNAUTHORIZED", "The public integration key was rejected");
      if (!response.ok) throw new WidgetError("NETWORK", `Widget API returned ${response.status}`);
      const payload = (await response.json()) as { items?: WidgetItem[] };
      if (!Array.isArray(payload.items)) throw new WidgetError("NETWORK", "Widget API returned an invalid response");
      return payload.items;
    } catch (error) {
      if (error instanceof WidgetError && error.code === "UNAUTHORIZED") throw error;
      if (attempt === 2) throw new WidgetError("NETWORK", "Unable to load widget content", error);
      onRetry(attempt + 1);
      await wait(200 * 2 ** attempt + Math.random() * 80);
    } finally {
      clearTimeout(timeout);
    }
  }
  throw new WidgetError("NETWORK", "Unable to load widget content");
}
