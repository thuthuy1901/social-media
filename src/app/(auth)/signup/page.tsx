import { Metadata } from 'next';
import Image from 'next/image';
import FormSignUp from './FormSignUp';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function Page() {
  return (
    <main className="min-w-[100vw] min-h-screen size-auto relative flex justify-center items-center">
      <Image
        src="/signup/banner.jpg"
        alt="banner signup"
        fill
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-black/50 z-[-9]"></div>
      <section className="h-fit ~py-2/5 ~px-2/10 w-[90%] max-w-[500px] mx-auto">
        <h1 className="text-white text-center">Sign Up</h1>
        <FormSignUp />
        <p className="text-center text-sm group mt-2">
          Already have an account?{' '}
          <Link
            href="/login"
            className="italic text-green-second font-bold group-hover:text-green-main dark:group-hover:text-white/50"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
