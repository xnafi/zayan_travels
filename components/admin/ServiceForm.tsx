"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, AlertCircle } from "lucide-react";
import { serviceSchema } from "@/lib/validations/service.schema";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type ServiceFormValues = z.input<typeof serviceSchema>;

const iconOptions = [
  { value: "Plane", label: "Plane" },
  { value: "Briefcase", label: "Briefcase" },
  { value: "GraduationCap", label: "Graduation Cap" },
  { value: "Building2", label: "Building" },
  { value: "Heart", label: "Heart" },
  { value: "Navigation", label: "Navigation" },
];

interface ServiceFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    content: string;
    icon: string | null;
    imageUrl: string | null;
    featured: boolean;
    published: boolean;
    order: number;
  };
}

export function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      content: initialData?.content ?? "",
      icon: initialData?.icon ?? "Plane",
      imageUrl: initialData?.imageUrl ?? null,
      featured: initialData?.featured ?? false,
      published: initialData?.published ?? false,
      order: initialData?.order ?? 0,
    },
  });

  const featured = useWatch({ control, name: "featured" });
  const published = useWatch({ control, name: "published" });

  const onSubmit = async (data: ServiceFormValues) => {
    setIsSubmitting(true);
    setError("");

    try {
      const url = initialData
        ? `/api/services/${initialData.id}`
        : "/api/services";
      const method = initialData ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
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
        throw new Error(result.error ?? "Failed to save service");
      }

      router.push("/dashboard/services");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save service");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-brand-dark"
          >
            Title
          </label>
          <Input
            id="title"
            placeholder="Tourist Visa"
            aria-invalid={!!errors.title}
            {...register("title")}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="order"
            className="mb-2 block text-sm font-medium text-brand-dark"
          >
            Display Order
          </label>
          <Input
            id="order"
            type="number"
            min={0}
            placeholder="0"
            aria-invalid={!!errors.order}
            {...register("order", { valueAsNumber: true })}
          />
          {errors.order && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.order.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-brand-dark"
        >
          Short Description
        </label>
        <textarea
          id="description"
          rows={3}
          maxLength={160}
          placeholder="Brief description of the service (max 160 characters)"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-brand-dark placeholder:text-brand-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:border-brand-primary"
          aria-invalid={!!errors.description}
          {...register("description")}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-medium text-brand-dark"
        >
          Content
        </label>
        <textarea
          id="content"
          rows={8}
          placeholder="Detailed description of the service..."
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-brand-dark placeholder:text-brand-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:border-brand-primary"
          aria-invalid={!!errors.content}
          {...register("content")}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.content.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="icon"
            className="mb-2 block text-sm font-medium text-brand-dark"
          >
            Icon
          </label>
          <select
            id="icon"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            {...register("icon")}
          >
            {iconOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="mb-2 block text-sm font-medium text-brand-dark"
          >
            Image URL
          </label>
          <Input
            id="imageUrl"
            type="url"
            placeholder="https://example.com/image.jpg"
            aria-invalid={!!errors.imageUrl}
            {...register("imageUrl")}
          />
          {errors.imageUrl && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.imageUrl.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setValue("featured", e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
          />
          <span className="text-sm font-medium text-brand-dark">Featured</span>
        </label>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setValue("published", e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
          />
          <span className="text-sm font-medium text-brand-dark">Published</span>
        </label>
      </div>

      {error && (
        <div
          className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/services")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : initialData ? (
            "Update Service"
          ) : (
            "Create Service"
          )}
        </Button>
      </div>
    </form>
  );
}