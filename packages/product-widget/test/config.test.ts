import { describe, expect, it } from "vitest";

import { normalizeConfig } from "../src/config";
import { WidgetError } from "../src/errors";

describe("widget configuration", () => {
  it("applies safe defaults", () => {
    const config = normalizeConfig({ apiKey: "demo_public", container: "#widget" });
    expect(config.theme).toBe("auto");
    expect(config.timeoutMs).toBe(6000);
  });

  it("rejects empty keys", () => {
    expect(() => normalizeConfig({ apiKey: " ", container: "#widget" })).toThrow(WidgetError);
  });

  it("rejects keys that appear to be secrets", () => {
    expect(() => normalizeConfig({ apiKey: "secret_server_key", container: "#widget" })).toThrow(/public integration key/);
  });
});
