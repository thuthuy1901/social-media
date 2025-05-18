import Image from 'next/image';
import SignInAdmin from './SignInAdmin';

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
        <SignInAdmin />
      </section>
    </main>
  );
}
