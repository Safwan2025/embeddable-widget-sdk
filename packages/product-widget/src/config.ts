import { WidgetError } from "./errors";
import type { WidgetConfig } from "./types";

export type NormalizedConfig = Required<Omit<WidgetConfig, "onEvent">> & Pick<WidgetConfig, "onEvent">;

export function resolveContainer(container: WidgetConfig["container"]): HTMLElement {
  const element = typeof container === "string" ? document.querySelector<HTMLElement>(container) : container;
  if (!element) throw new WidgetError("CONTAINER_NOT_FOUND", `Widget container was not found: ${String(container)}`);
  return element;
}

export function normalizeConfig(config: WidgetConfig): NormalizedConfig {
  if (!config.apiKey?.trim()) throw new WidgetError("INVALID_CONFIG", "apiKey is required");
  if (config.apiKey.toLowerCase().includes("secret")) {
    throw new WidgetError("INVALID_CONFIG", "Use a public integration key, never a secret server key");
  }
  const timeoutMs = config.timeoutMs ?? 6000;
  if (timeoutMs < 1000 || timeoutMs > 15000) throw new WidgetError("INVALID_CONFIG", "timeoutMs must be between 1000 and 15000");
  return {
    ...config,
    apiKey: config.apiKey.trim(),
    container: config.container,
    apiBaseUrl: config.apiBaseUrl ?? "demo",
    theme: config.theme ?? "auto",
    locale: config.locale ?? "en",
    accentColor: config.accentColor ?? "#3867e8",
    timeoutMs,
  };
}
