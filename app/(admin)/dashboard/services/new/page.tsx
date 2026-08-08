import { ServiceForm } from "@/components/admin/ServiceForm";

export const metadata = {
  title: "New Service",
  description: "Create a new visa service",
};

export default function NewServicePage() {
  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-dark">
          New Service
        </h1>
        <p className="mt-1 text-sm text-brand-muted">
          Create a new visa service for your website
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <ServiceForm />
      </div>
    </div>
  );
}