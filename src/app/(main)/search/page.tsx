import TrendSidebar from '@/components/trend-sidebar';
import { Metadata } from 'next';
import SearchResults from './SearchResults';

interface PageProps {
  searchParams: Promise<{ search: string }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { search } = await searchParams;
  return {
    title: `Search results for "${search}"`,
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { search } = await searchParams;
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-md border bg-bg-main shadow-md ~p-3/5">
          <h1 className="text-center ~text-xl/2xl font-bold">
            Search results for &quot;{search}&quot;
          </h1>
        </div>
        <SearchResults query={search} />
      </div>
      <TrendSidebar />
    </main>
  );
}
