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
      <section className="h-fit ~py-2/5 ~px-2/10 bg-white/40 border border-white ~rounded-xl/2xl w-[90%] max-w-[500px] mx-auto">
        <h1 className="text-white text-center">Sign Up</h1>
        <FormSignUp />
        <p className="text-center text-sm group">
          Already have an account?{' '}
          <Link
            href="/login"
            className="italic text-green-second font-bold group-hover:text-green-main"
          >
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}