import ProductWidget, { type WidgetEvent } from "@portfolio/product-widget";

const events = document.querySelector<HTMLPreElement>("#events")!;
const instance = ProductWidget.init({
  apiKey: import.meta.env.VITE_WIDGET_PUBLIC_API_KEY ?? "demo_public_key",
  apiBaseUrl: import.meta.env.VITE_WIDGET_API_BASE_URL ?? "demo",
  container: "#product-widget",
  theme: "auto",
  onEvent: (event: WidgetEvent) => { events.textContent = JSON.stringify(event, null, 2); },
});

document.querySelector("#light")?.addEventListener("click", () => instance.update({ theme: "light" }));
document.querySelector("#dark")?.addEventListener("click", () => instance.update({ theme: "dark" }));
document.querySelector("#refresh")?.addEventListener("click", () => void instance.refresh());
document.querySelector("#destroy")?.addEventListener("click", () => instance.destroy());
