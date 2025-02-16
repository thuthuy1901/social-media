import SearchField from '@/components/ui/search-field';
import UserButton from '@/components/user-button';
import Logo from './logo';

export default function Navbar() {
  return (
    <header className="bg-white/50 dark:bg-white/10 sticky top-0 px-2 border-b shadow-lg backdrop-blur-sm z-50">
      <div className="container mx-auto flex justify-between ~py-1/2">
        <Logo />
        <SearchField />
        <UserButton />
      </div>
    </header>
  );
}
