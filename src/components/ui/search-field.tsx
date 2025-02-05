'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Input } from './input';
import { Search } from 'lucide-react';

export default function SearchField() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const search = (form.search as HTMLInputElement).value.trim();
    if (!search) return;
    router.push(`/search?search=${encodeURIComponent(search)}`);
  }
  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <Input name="search" placeholder="Search" className="" />
        <Search className="absolute right-0 top-0 h-full size-5 pr-2" />
      </div>
    </form>
  );
}
