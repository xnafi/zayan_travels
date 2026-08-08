import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ServiceTable } from "@/components/admin/ServiceTable";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Manage Services",
  description: "Manage your visa services",
};

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-dark">
            Services
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Manage your visa services
          </p>
        </div>
        <Link href="/dashboard/services/new">
          <Button>
            <Plus className="h-4 w-4" />
            New Service
          </Button>
        </Link>
      </div>

      <div className="mt-8">
        <ServiceTable services={services} />
      </div>
    </div>
  );
}