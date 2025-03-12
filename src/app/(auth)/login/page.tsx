import { Metadata } from 'next';
import Image from 'next/image';
import FormLogin from './LoginForm';
import Link from 'next/link';
import GoogleSignInButton from './GoogleSignInButton';

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
      <div className="absolute inset-0 bg-black/50 z-[-9]"></div>
      <section className="h-fit ~py-2/5 ~px-2/10 w-[90%] max-w-[500px] mx-auto">
        <h1 className="text-white text-center">Sign In</h1>
        <GoogleSignInButton />
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-muted" />
          <span className="text-white">OR</span>
          <div className="h-px flex-1 bg-muted" />
        </div>
        <FormLogin />
        <p className="text-center text-sm group mt-2">
          Dont have account?{' '}
          <Link
            href="/signup"
            className="italic text-green-second font-bold group-hover:text-green-main dark:group-hover:text-white/50"
          >
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}
