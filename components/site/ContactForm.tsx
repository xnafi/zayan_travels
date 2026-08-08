"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations/contact.schema";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function ContactForm() {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      destinationCountry: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as {
        success: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Failed to send message");
      }

      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message"
      );
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
        <h3 className="mt-4 font-display text-xl font-semibold text-green-800">
          Message Sent Successfully!
        </h3>
        <p className="mt-2 text-sm text-green-700">
          Thank you for contacting Zayan Travels. Our team will get back to you
          within 24 hours.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-brand-dark"
          >
            Full Name
          </label>
          <Input
            id="fullName"
            placeholder="John Doe"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-brand-dark"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-brand-dark"
          >
            Phone
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="+880 1234 567 890"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="destinationCountry"
            className="mb-2 block text-sm font-medium text-brand-dark"
          >
            Country of Destination
          </label>
          <Input
            id="destinationCountry"
            placeholder="United States"
            aria-invalid={!!errors.destinationCountry}
            {...register("destinationCountry")}
          />
          {errors.destinationCountry && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.destinationCountry.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-brand-dark"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your visa requirements..."
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-brand-dark placeholder:text-brand-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:border-brand-primary"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div
          className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}