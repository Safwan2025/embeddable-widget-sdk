export const styles = `
  :host{all:initial;color-scheme:light dark;display:block;container-type:inline-size}
  *,*::before,*::after{box-sizing:border-box}
  .widget{--pw-bg:#fff;--pw-text:#172033;--pw-muted:#5f6b7d;--pw-line:#dfe5ef;--pw-accent:#3867e8;font:400 15px/1.5 Inter,ui-sans-serif,system-ui,sans-serif;background:var(--pw-bg);color:var(--pw-text);border:1px solid var(--pw-line);border-radius:14px;box-shadow:0 16px 40px rgba(20,34,61,.12);overflow:hidden;max-width:620px}
  .widget.dark{--pw-bg:#121927;--pw-text:#f5f7fb;--pw-muted:#a6b1c3;--pw-line:#2a364b}
  @media(prefers-color-scheme:dark){.widget.auto{--pw-bg:#121927;--pw-text:#f5f7fb;--pw-muted:#a6b1c3;--pw-line:#2a364b}}
  header{padding:18px 20px 14px;border-bottom:1px solid var(--pw-line)} h2{font:700 18px/1.3 Inter,ui-sans-serif,system-ui;margin:0} .sub{color:var(--pw-muted);font-size:13px;margin:3px 0 0}
  .content{padding:12px}.item{padding:15px;border-radius:10px}.item+.item{border-top:1px solid var(--pw-line);border-radius:0}.item h3{font-size:15px;margin:0 0 4px}.item p{color:var(--pw-muted);font-size:13px;margin:0 0 12px}
  button{appearance:none;border:0;border-radius:8px;background:var(--pw-accent);color:#fff;font:600 13px/1 Inter,ui-sans-serif,system-ui;padding:10px 12px;cursor:pointer}button:hover{filter:brightness(1.07)}button:focus-visible{outline:3px solid color-mix(in srgb,var(--pw-accent),white 45%);outline-offset:2px}
  .state{padding:28px 20px;text-align:center;color:var(--pw-muted)}.error{color:#a43232}.spinner{width:22px;height:22px;border:2px solid var(--pw-line);border-top-color:var(--pw-accent);border-radius:50%;margin:0 auto 10px;animation:spin .75s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
  @container(max-width:420px){header{padding:15px}.content{padding:8px}.item{padding:12px}}
  @media(prefers-reduced-motion:reduce){.spinner{animation:none;border-top-color:var(--pw-line)}}
`;
