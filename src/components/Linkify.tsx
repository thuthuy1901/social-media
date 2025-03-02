import Link from 'next/link';
import { LinkItUrl, LinkIt } from 'react-linkify-it';
import UserLinkWithTooltip from './user-link-with-tooltip';
interface LinkifyProps {
  children: React.ReactNode;
}

export function Linkify({ children }: LinkifyProps) {
  return (
    <LinkifyUsername>
      <LinkifyHashtag>
        <LinkifyUrl>{children}</LinkifyUrl>
      </LinkifyHashtag>
    </LinkifyUsername>
  );
}

function LinkifyUrl({ children }: LinkifyProps) {
  return (
    <LinkItUrl className="text-text-second hover:underline">
      {children}
    </LinkItUrl>
  );
}

function LinkifyUsername({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(@[a-zA-Z0-9]+)/}
      component={(match, key) => (
        <UserLinkWithTooltip key={key} username={match.slice(1)}>
          {match}
        </UserLinkWithTooltip>
      )}
    >
      {children}
    </LinkIt>
  );
}

function LinkifyHashtag({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(#[a-zA-Z0-9]+)/}
      component={(match, key) => (
        <Link
          href={`/hashtag/${match.slice(1)}`}
          key={key}
          className="text-text-second hover:underline"
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  );
}
