'use client';

import {useEffect, useState} from 'react';
import {client, urlFor, type SanityImageSource} from '../sanity/client';

type ListenLink = {platform: string; url: string};

type Release = {
  title: string;
  coverArt: SanityImageSource;
  links?: ListenLink[];
};

// Newest release by release date.
const LATEST_RELEASE_QUERY = `*[_type == "release" && defined(coverArt)]
  | order(releaseDate desc)[0]{
    title,
    coverArt,
    links[]{platform, url}
  }`;

export default function ReleaseBanner() {
  const [release, setRelease] = useState<Release | null>(null);

  useEffect(() => {
    let active = true;
    client
      .fetch<Release | null>(LATEST_RELEASE_QUERY)
      .then((data) => {
        if (active) setRelease(data);
      })
      .catch((err) => {
        // Fail silently — the homepage should still render without a banner.
        console.error('Failed to load latest release', err);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!release) return null;

  const cover = urlFor(release.coverArt).width(160).height(160).fit('crop').url();
  const links = release.links ?? [];

  return (
    <aside className="release-banner">
      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="release-banner__cover" src={cover} alt={release.title} />
      )}
      <div className="release-banner__body">
        <span className="release-banner__label">New release</span>
        <span className="release-banner__title">{release.title}</span>
        {links.length > 0 && (
          <nav className="release-banner__links">
            {links.map((link) => (
              <a
                key={`${link.platform}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.platform}
              </a>
            ))}
          </nav>
        )}
      </div>
    </aside>
  );
}
