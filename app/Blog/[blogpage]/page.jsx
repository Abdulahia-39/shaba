import { cache } from 'react';
import { notFound } from 'next/navigation';
import { fetchArticle } from '@/actions/blog-actions';
import ArticlePage from '@/components/public/ArticlePage';
import SiteShell, { PageIntro } from '@/components/public/SiteShell';
export const dynamic = 'force-dynamic';
const getArticle = cache(fetchArticle);
export async function generateMetadata({ params }) {
  const { blogpage } = await params;
  const response = await getArticle(blogpage);
  return { title: response?.data?.attributes.title || 'Publication', description: response?.data?.attributes.description, ...(!response?.data ? { robots: { index: false, follow: false } } : {}) };
}
export default async function Page({ params }) {
  const { blogpage } = await params;
  const response = await getArticle(blogpage);
  if (!response) return <SiteShell><PageIntro label="Please try again" title="This update is temporarily unavailable." description="Please refresh the page or contact Shaba for assistance." /></SiteShell>;
  if (!response.data) notFound();
  return <ArticlePage post={response.data} />;
}
