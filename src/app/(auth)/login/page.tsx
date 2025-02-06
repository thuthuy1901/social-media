import { Metadata } from 'next';
import Image from 'next/image';
import FormLogin from './LoginForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login',
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
      <section className="h-fit ~py-2/5 ~px-2/10 bg-white/40 dark:bg-black/30 border border-white dark:border-white/50 rounded-lg w-[90%] max-w-[500px] mx-auto">
        <h1 className="text-white text-center">Login</h1>
        <FormLogin />
        <p className="text-center text-sm group">
          Dont have account?{' '}
          <Link
            href="/signup"
            className="italic text-green-second font-bold group-hover:text-green-main dark:group-hover:text-white/50"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
