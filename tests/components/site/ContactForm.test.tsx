import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/site/ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all form fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Country of Destination")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send Message" })
    ).toBeInTheDocument();
  });

  it("shows validation errors for invalid input", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(
      await screen.findByText("Full name must be at least 2 characters")
    ).toBeInTheDocument();
    expect(await screen.findByText("Invalid email address")).toBeInTheDocument();
  });

  it("successfully submits valid form data", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Full Name"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.type(screen.getByLabelText("Phone"), "+8801234567890");
    await user.type(
      screen.getByLabelText("Country of Destination"),
      "United States"
    );
    await user.type(
      screen.getByLabelText("Message"),
      "I need help with a tourist visa application."
    );

    await user.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(
        screen.getByText("Message Sent Successfully!")
      ).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });

  it("displays error message on submission failure", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        success: false,
        error: "Failed to send message",
      }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Full Name"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.type(screen.getByLabelText("Phone"), "+8801234567890");
    await user.type(
      screen.getByLabelText("Country of Destination"),
      "United States"
    );
    await user.type(
      screen.getByLabelText("Message"),
      "I need help with a tourist visa application."
    );

    await user.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(screen.getByText("Failed to send message")).toBeInTheDocument();
    });
  });
});