import type { WidgetEvent, WidgetItem, WidgetLocale, WidgetTheme } from "./types";

const copy = {
  en: { title: "Workspace updates", subtitle: "Relevant next steps for this synthetic workspace", loading: "Loading updates", failed: "Updates could not be loaded.", retry: "Try again" },
  de: { title: "Workspace-Updates", subtitle: "Relevante nächste Schritte für diesen Demo-Workspace", loading: "Updates werden geladen", failed: "Updates konnten nicht geladen werden.", retry: "Erneut versuchen" },
};

interface Props {
  items: WidgetItem[];
  status: "loading" | "ready" | "error";
  theme: WidgetTheme;
  locale: WidgetLocale;
  accentColor: string;
  onRetry: () => void;
  emit: (event: WidgetEvent) => void;
}

export function Widget({ items, status, theme, locale, accentColor, onRetry, emit }: Props) {
  const text = copy[locale];
  return (
    <section className={`widget ${theme}`} style={{ "--pw-accent": accentColor } as React.CSSProperties} aria-busy={status === "loading"}>
      <header><h2>{text.title}</h2><p className="sub">{text.subtitle}</p></header>
      {status === "loading" && <div className="state" role="status"><div className="spinner" aria-hidden="true" />{text.loading}</div>}
      {status === "error" && <div className="state error" role="alert"><p>{text.failed}</p><button type="button" onClick={onRetry}>{text.retry}</button></div>}
      {status === "ready" && <div className="content">{items.map((item) => <article className="item" key={item.id}><h3>{item.title}</h3><p>{item.description}</p><button type="button" onClick={() => emit({ type: "cta_clicked", payload: { itemId: item.id } })}>{item.actionLabel}</button></article>)}</div>}
    </section>
  );
}
