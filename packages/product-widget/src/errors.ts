export type WidgetErrorCode = "INVALID_CONFIG" | "CONTAINER_NOT_FOUND" | "UNAUTHORIZED" | "NETWORK" | "DESTROYED";

export class WidgetError extends Error {
  constructor(public readonly code: WidgetErrorCode, message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "WidgetError";
  }
}
