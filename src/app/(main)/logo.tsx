'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Link href="/" title="logo" className="flex">
      <Image
        src={resolvedTheme === 'light' ? '/logo.png' : '/logo-light.png'}
        alt="logo icon"
        width={200}
        height={100}
        className="object-contain ~w-8/16 h-auto"
      />
    </Link>
  );
};

export default Logo;
