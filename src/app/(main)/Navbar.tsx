import SearchField from '@/components/ui/search-field';
import UserButton from '@/components/user-button';
import Logo from './logo';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function Navbar() {
  const locale = await getLocale();
  const t = await getTranslations('home');

  return (
    <header className="bg-white/50 dark:bg-white/10 sticky top-0 px-2 border-b shadow-lg backdrop-blur-sm z-50">
      <div className="container mx-auto flex justify-between ~py-1/2">
        <Logo />
        <SearchField placeholder={t('placeholder-search')} />
        <UserButton
          title={t('box-user.title')}
          profile={t('box-user.profile')}
          themeTitle={t('box-user.theme.title')}
          themeLight={t('box-user.theme.light')}
          themeDark={t('box-user.theme.dark')}
          themeSystem={t('box-user.theme.system')}
          logOut={t('box-user.theme.log-out')}
          languageTitle={t('box-user.language.title')}
          vi={t('box-user.language.vi')}
          en={t('box-user.language.en')}
          locale={locale}
        />
      </div>
    </header>
  );
}
