import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  await prisma.adminUser.upsert({
    where: { email: "admin@zayantravels.com" },
    update: {},
    create: {
      email: "admin@zayantravels.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  const services = [
    {
      title: "Tourist Visa",
      slug: "tourist-visa",
      description: "Hassle-free tourist visas for 50+ countries with expert guidance.",
      content: "We handle the complete tourist visa application process, from document preparation to submission. Our experts ensure your application meets all requirements for a smooth approval.",
      icon: "Plane",
      featured: true,
      published: true,
      order: 1,
    },
    {
      title: "Business Visa",
      slug: "business-visa",
      description: "Fast-track business visas for corporate professionals and entrepreneurs.",
      content: "Our business visa service covers corporate travel needs with expedited processing. We assist with invitation letters, company documentation, and interview preparation.",
      icon: "Briefcase",
      featured: true,
      published: true,
      order: 2,
    },
    {
      title: "Student Visa",
      slug: "student-visa",
      description: "Complete support for international students seeking education abroad.",
      content: "We guide students through the entire visa process, including university applications, financial documentation, and visa interviews. Our counselors are with you every step.",
      icon: "GraduationCap",
      featured: true,
      published: true,
      order: 3,
    },
    {
      title: "Work Visa",
      slug: "work-visa",
      description: "Employment visas for skilled professionals and specialized workers.",
      content: "Our work visa specialists assist with employment sponsorship, labor market assessments, and all required documentation for international work permits.",
      icon: "Building2",
      featured: true,
      published: true,
      order: 4,
    },
    {
      title: "Family & Spouse Visa",
      slug: "family-spouse-visa",
      description: "Reunite with family through our family and spouse visa services.",
      content: "We assist with family reunification visas, spousal visas, and dependent visas. Our team ensures all relationship documentation meets immigration standards.",
      icon: "Heart",
      featured: false,
      published: true,
      order: 5,
    },
    {
      title: "Transit Visa",
      slug: "transit-visa",
      description: "Quick transit visas for connecting flights and layovers.",
      content: "Need to pass through another country? We process transit visas quickly so your journey stays on schedule without unnecessary delays.",
      icon: "Navigation",
      featured: false,
      published: true,
      order: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }

  console.log("Seed completed: admin user and 6 services created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });