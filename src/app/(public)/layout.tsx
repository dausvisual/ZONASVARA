import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import prisma from "@/lib/prisma";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let breakingNewsTitles: string[] = [];
  try {
    const latestNews = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { title: true }
    });
    breakingNewsTitles = latestNews.map(n => n.title);
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="min-h-full flex flex-col pb-[60px] lg:pb-0">
      <Header breakingNews={breakingNewsTitles} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
