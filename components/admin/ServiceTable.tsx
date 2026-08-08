"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatDate } from "@/lib/utils";

interface Service {
  id: string;
  title: string;
  description: string;
  published: boolean;
  featured: boolean;
  order: number;
  createdAt: Date;
}

interface ServiceTableProps {
  services: Service[];
}

export function ServiceTable({ services }: ServiceTableProps) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = React.useState<Service | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/services/${deleteTarget.id}`, {
        method: "DELETE",
      });

      const result = (await response.json()) as {
        success: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Failed to delete service");
      }

      setDeleteTarget(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete service");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-brand-dark">Title</th>
              <th className="px-6 py-3 font-semibold text-brand-dark">Status</th>
              <th className="px-6 py-3 font-semibold text-brand-dark">Featured</th>
              <th className="px-6 py-3 font-semibold text-brand-dark">Order</th>
              <th className="px-6 py-3 font-semibold text-brand-dark">Created</th>
              <th className="px-6 py-3 text-right font-semibold text-brand-dark">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {services.map((service) => (
              <tr key={service.id} className="transition-colors hover:bg-slate-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-brand-dark">{service.title}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-brand-muted">
                    {service.description}
                  </p>
                </td>
                <td className="px-6 py-4">
                  {service.published ? (
                    <Badge variant="success">Published</Badge>
                  ) : (
                    <Badge variant="warning">Draft</Badge>
                  )}
                </td>
                <td className="px-6 py-4">
                  {service.featured ? (
                    <Badge variant="secondary">Featured</Badge>
                  ) : (
                    <span className="text-brand-muted">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-brand-muted">{service.order}</td>
                <td className="px-6 py-4 text-brand-muted">
                  {formatDate(service.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/dashboard/services/${service.id}/edit`}
                      className="rounded-lg p-2 text-brand-muted transition-colors hover:bg-brand-primary/10 hover:text-brand-primary"
                      aria-label={`Edit ${service.title}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(service)}
                      className="rounded-lg p-2 text-brand-muted transition-colors hover:bg-red-50 hover:text-red-600"
                      aria-label={`Delete ${service.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-brand-muted">No services found</p>
            <Link href="/dashboard/services/new" className="mt-4">
              <Button size="sm">
                <Plus className="h-4 w-4" />
                Create Service
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Service"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      >
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setDeleteTarget(null)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </>
  );
}