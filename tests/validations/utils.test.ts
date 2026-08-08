import { describe, it, expect } from "vitest";
import { cn, formatDate, truncateText, relativeTime } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("handles undefined and null values", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });
});

describe("formatDate utility", () => {
  it("formats a Date object", () => {
    const date = new Date(2026, 0, 15);
    expect(formatDate(date)).toBe("Jan 15, 2026");
  });

  it("formats a string date", () => {
    expect(formatDate("2026-03-01")).toBe("Mar 1, 2026");
  });
});

describe("truncateText utility", () => {
  it("returns text unchanged when within max length", () => {
    expect(truncateText("Hello", 10)).toBe("Hello");
  });

  it("truncates text with ellipsis when exceeding max length", () => {
    expect(truncateText("Hello world!", 5)).toBe("Hello...");
  });

  it("handles exact length text", () => {
    expect(truncateText("Hello", 5)).toBe("Hello");
  });
});

describe("relativeTime utility", () => {
  it("returns just now for recent timestamps", () => {
    const now = Date.now();
    expect(relativeTime(now - 5000)).toBe("just now");
  });

  it("returns minutes ago", () => {
    const now = Date.now();
    expect(relativeTime(now - 5 * 60 * 1000)).toBe("5 minutes ago");
  });

  it("returns singular minute for 1 minute", () => {
    const now = Date.now();
    expect(relativeTime(now - 60 * 1000)).toBe("1 minute ago");
  });

  it("returns hours ago", () => {
    const now = Date.now();
    expect(relativeTime(now - 3 * 60 * 60 * 1000)).toBe("3 hours ago");
  });

  it("returns days ago", () => {
    const now = Date.now();
    expect(relativeTime(now - 2 * 24 * 60 * 60 * 1000)).toBe("2 days ago");
  });

  it("returns weeks ago", () => {
    const now = Date.now();
    expect(relativeTime(now - 3 * 7 * 24 * 60 * 60 * 1000)).toBe(
      "3 weeks ago"
    );
  });

  it("returns months ago", () => {
    const now = Date.now();
    expect(relativeTime(now - 2 * 30 * 24 * 60 * 60 * 1000)).toBe(
      "2 months ago"
    );
  });

  it("returns years ago", () => {
    const now = Date.now();
    expect(relativeTime(now - 2 * 365 * 24 * 60 * 60 * 1000)).toBe(
      "2 years ago"
    );
  });
});