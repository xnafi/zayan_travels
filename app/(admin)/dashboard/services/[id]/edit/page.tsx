import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "@/components/admin/ServiceForm";

export const metadata = {
  title: "Edit Service",
  description: "Edit a visa service",
};

export const dynamic = "force-dynamic";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) {
    notFound();
  }

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-dark">
          Edit Service
        </h1>
        <p className="mt-1 text-sm text-brand-muted">
          Update the details of this visa service
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <ServiceForm
          initialData={{
            id: service.id,
            title: service.title,
            description: service.description,
            content: service.content,
            icon: service.icon,
            imageUrl: service.imageUrl,
            featured: service.featured,
            published: service.published,
            order: service.order,
          }}
        />
      </div>
    </div>
  );
}