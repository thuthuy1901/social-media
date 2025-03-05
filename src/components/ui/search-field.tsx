'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Input } from './input';
import { Search } from 'lucide-react';

interface SearchFieldProps {
  placeholder: string;
}

export default function SearchField({ placeholder }: SearchFieldProps) {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const search = (form.search as HTMLInputElement).value.trim();
    if (!search) return;
    router.push(`/search?search=${encodeURIComponent(search)}`);
  }
  return (
    <form
      onSubmit={handleSubmit}
      method="GET"
      action="/search"
      className="flex items-center"
    >
      <div className="relative">
        <Input name="search" placeholder={placeholder} className="~h-7/9" />
        <Search className="absolute right-0 top-0 h-full size-5 pr-2" />
      </div>
    </form>
  );
}
