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

  const realtors = await prisma.user.findMany({
    where: { role: 'CORRETOR', status: 'ACTIVE' },
    select: {
      id: true,
      name: true,
      creci: true,
      phone: true,
      whatsapp: true,
      bio: true,
      avatarUrl: true,
      coverUrl: true,
      agencyName: true,
      _count: {
        select: { properties: true },
      },
    },
  });

  return (
    <HomePageClient
      featuredProperties={featuredProperties}
      realtors={realtors}
    />
  );
}
