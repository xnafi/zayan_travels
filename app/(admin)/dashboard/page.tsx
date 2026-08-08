import Link from "next/link";
import { FileText, CheckCircle2, Clock, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Dashboard",
  description: "Zayan Travels admin dashboard",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [totalServices, publishedServices, draftServices] = await Promise.all([
    prisma.service.count(),
    prisma.service.count({ where: { published: true } }),
    prisma.service.count({ where: { published: false } }),
  ]);

  const stats = [
    {
      icon: FileText,
      label: "Total Services",
      value: totalServices,
      color: "bg-brand-primary/10 text-brand-primary",
    },
    {
      icon: CheckCircle2,
      label: "Published",
      value: publishedServices,
      color: "bg-green-100 text-green-700",
    },
    {
      icon: Clock,
      label: "Drafts",
      value: draftServices,
      color: "bg-amber-100 text-amber-700",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-dark">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Manage your visa services and content
          </p>
        </div>
        <Link href="/dashboard/services/new">
          <Button>
            <Plus className="h-4 w-4" />
            New Service
          </Button>
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-brand-dark">
                  {stat.value}
                </p>
                <p className="text-sm text-brand-muted">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold text-brand-dark">
            Quick Actions
          </h2>
          <div className="mt-4 space-y-3">
            <Link
              href="/dashboard/services/new"
              className="block rounded-lg border border-slate-200 p-4 transition-colors hover:border-brand-primary hover:bg-brand-primary/5"
            >
              <p className="font-medium text-brand-dark">Create New Service</p>
              <p className="mt-1 text-sm text-brand-muted">
                Add a new visa service to your website
              </p>
            </Link>
            <Link
              href="/dashboard/services"
              className="block rounded-lg border border-slate-200 p-4 transition-colors hover:border-brand-primary hover:bg-brand-primary/5"
            >
              <p className="font-medium text-brand-dark">Manage Services</p>
              <p className="mt-1 text-sm text-brand-muted">
                Edit, publish, or delete existing services
              </p>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold text-brand-dark">
            Recent Services
          </h2>
          <div className="mt-4 space-y-3">
            {totalServices === 0 ? (
              <p className="text-sm text-brand-muted">
                No services yet. Create your first service to get started.
              </p>
            ) : (
              <p className="text-sm text-brand-muted">
                You have {totalServices} service
                {totalServices === 1 ? "" : "s"} in your database. Visit the
                Services page to manage them.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}