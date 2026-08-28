import { createRoot, type Root } from "react-dom/client";

import { fetchItems } from "./client";
import { normalizeConfig, resolveContainer, type NormalizedConfig } from "./config";
import { WidgetError } from "./errors";
import { styles } from "./styles";
import type { WidgetConfig, WidgetEvent, WidgetInstance, WidgetItem } from "./types";
import { Widget } from "./Widget";

export * from "./errors";
export type * from "./types";

function safeEmit(config: NormalizedConfig, event: WidgetEvent): void {
  try { config.onEvent?.(event); } catch { /* Host callbacks cannot break the widget. */ }
}

export function init(initialConfig: WidgetConfig): WidgetInstance {
  let config = normalizeConfig(initialConfig);
  const container = resolveContainer(config.container);
  const host = document.createElement("div");
  host.dataset.productWidget = "v1";
  container.append(host);
  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = styles;
  const mount = document.createElement("div");
  shadow.append(style, mount);
  const root: Root = createRoot(mount);
  let items: WidgetItem[] = [];
  let status: "loading" | "ready" | "error" = "loading";
  let destroyed = false;

  const render = () => root.render(<Widget items={items} status={status} theme={config.theme} locale={config.locale} accentColor={config.accentColor} onRetry={() => void refresh()} emit={(event) => safeEmit(config, event)} />);
  const refresh = async () => {
    if (destroyed) throw new WidgetError("DESTROYED", "This widget instance has been destroyed");
    status = "loading"; render();
    try {
      items = await fetchItems(config.apiBaseUrl, config.apiKey, config.timeoutMs, (attempt) => safeEmit(config, { type: "retry", payload: { attempt } }));
      status = "ready"; render(); safeEmit(config, { type: "ready", payload: { itemCount: items.length } });
    } catch (error) {
      status = "error"; render();
      safeEmit(config, { type: "load_failed", payload: { code: error instanceof WidgetError ? error.code : "NETWORK" } });
    }
  };

  render(); void refresh();
  return {
    update(next) { config = normalizeConfig({ ...config, ...next, container: config.container }); render(); safeEmit(config, { type: "updated", payload: {} }); },
    refresh,
    destroy() { if (destroyed) return; safeEmit(config, { type: "destroyed", payload: {} }); destroyed = true; root.unmount(); host.remove(); },
  };
}

const ProductWidget = { init };
export default ProductWidget;
