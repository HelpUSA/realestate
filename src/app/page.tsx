import { prisma } from '@/lib/prisma';
import HomePageClient from '@/components/HomePageClient';

export const revalidate = 60;

export default async function HomePage() {
  const featuredProperties = await prisma.property.findMany({
    where: { status: 'AVAILABLE' },
    take: 6,
    include: {
      realtor: {
        select: {
          id: true,
          name: true,
          creci: true,
          whatsapp: true,
          avatarUrl: true,
          agencyName: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <HomePageClient
      featuredProperties={featuredProperties}
    />
  );
}
