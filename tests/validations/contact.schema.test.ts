import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/validations/contact.schema";

describe("contactSchema", () => {
  it("accepts a valid contact form", () => {
    const result = contactSchema.safeParse({
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+8801234567890",
      destinationCountry: "United States",
      message: "I need help with a tourist visa application.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      fullName: "John Doe",
      email: "not-an-email",
      phone: "+8801234567890",
      destinationCountry: "United States",
      message: "I need help with a tourist visa application.",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it("rejects short message", () => {
    const result = contactSchema.safeParse({
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+8801234567890",
      destinationCountry: "United States",
      message: "Too short",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.message).toBeDefined();
    }
  });

  it("rejects short full name", () => {
    const result = contactSchema.safeParse({
      fullName: "J",
      email: "john@example.com",
      phone: "+8801234567890",
      destinationCountry: "United States",
      message: "I need help with a tourist visa application.",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.fullName).toBeDefined();
    }
  });

  it("rejects empty destination country", () => {
    const result = contactSchema.safeParse({
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+8801234567890",
      destinationCountry: "",
      message: "I need help with a tourist visa application.",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.destinationCountry).toBeDefined();
    }
  });
});