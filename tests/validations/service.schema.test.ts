import { describe, it, expect } from "vitest";
import { serviceSchema } from "@/lib/validations/service.schema";

describe("serviceSchema", () => {
  it("accepts a valid service", () => {
    const result = serviceSchema.safeParse({
      title: "Tourist Visa",
      description: "Hassle-free tourist visas",
      content: "Full visa application support",
      icon: "Plane",
      imageUrl: null,
      featured: true,
      published: true,
      order: 1,
    });

    expect(result.success).toBe(true);
  });

  it("rejects empty title", () => {
    const result = serviceSchema.safeParse({
      title: "",
      description: "Hassle-free tourist visas",
      content: "Full visa application support",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.title).toBeDefined();
    }
  });

  it("rejects description longer than 160 characters", () => {
    const result = serviceSchema.safeParse({
      title: "Tourist Visa",
      description: "a".repeat(161),
      content: "Full visa application support",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.description).toBeDefined();
    }
  });

  it("rejects invalid image URL", () => {
    const result = serviceSchema.safeParse({
      title: "Tourist Visa",
      description: "Hassle-free tourist visas",
      content: "Full visa application support",
      imageUrl: "not-a-url",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.imageUrl).toBeDefined();
    }
  });

  it("applies defaults for optional fields", () => {
    const result = serviceSchema.safeParse({
      title: "Tourist Visa",
      description: "Hassle-free tourist visas",
      content: "Full visa application support",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.featured).toBe(false);
      expect(result.data.published).toBe(false);
      expect(result.data.order).toBe(0);
      expect(result.data.icon).toBe("Plane");
      expect(result.data.imageUrl).toBeNull();
    }
  });
});