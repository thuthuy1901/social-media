import SearchField from '@/components/ui/search-field';
import UserButton from '@/components/ui/user-button';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white sticky top-0 px-2">
      <div className="container mx-auto flex justify-between ~py-1/2">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo icon"
            width={200}
            height={100}
            className="object-contain ~w-8/16 h-auto"
          />
        </Link>
        <SearchField />
        <UserButton />
      </div>
    </header>
  );
}
