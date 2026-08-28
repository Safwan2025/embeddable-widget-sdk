export type WidgetTheme = "light" | "dark" | "auto";
export type WidgetLocale = "en" | "de";

export type WidgetEvent =
  | { type: "ready"; payload: { itemCount: number } }
  | { type: "retry"; payload: { attempt: number } }
  | { type: "load_failed"; payload: { code: string } }
  | { type: "cta_clicked"; payload: { itemId: string } }
  | { type: "updated"; payload: Record<string, never> }
  | { type: "destroyed"; payload: Record<string, never> };

export interface WidgetConfig {
  apiKey: string;
  container: string | HTMLElement;
  apiBaseUrl?: string;
  theme?: WidgetTheme;
  locale?: WidgetLocale;
  accentColor?: string;
  timeoutMs?: number;
  onEvent?: (event: WidgetEvent) => void;
}

export interface WidgetInstance {
  update(next: Partial<Omit<WidgetConfig, "container">>): void;
  refresh(): Promise<void>;
  destroy(): void;
}

export interface WidgetItem {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
}
