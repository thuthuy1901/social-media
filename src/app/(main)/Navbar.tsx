import SearchField from '@/components/ui/search-field';
import UserButton from '@/components/ui/user-button';
import Logo from './logo';

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-white/10 sticky top-0 px-2 border-b dark:border-white/50 shadow-md dark:shadow-white/30 backdrop-blur-sm z-50">
      <div className="container mx-auto flex justify-between ~py-1/2">
        <Logo />
        <SearchField />
        <UserButton />
      </div>
    </header>
  );
}
