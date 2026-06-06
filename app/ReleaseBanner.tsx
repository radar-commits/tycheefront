'use client';

import {useEffect, useRef, useState} from 'react';
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
  const [open, setOpen] = useState(false);
  const listenRef = useRef<HTMLDivElement>(null);

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

  // Close the dropdown when clicking outside it.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (listenRef.current && !listenRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

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
      </div>
      {links.length > 0 && (
        <div className="release-banner__listen" ref={listenRef}>
          <button
            type="button"
            className="release-banner__listen-btn"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="true"
            aria-expanded={open}
          >
            Listen now
            <span className={`release-banner__caret${open ? ' is-open' : ''}`}>
              ▾
            </span>
          </button>
          {open && (
            <ul className="release-banner__menu">
              {links.map((link) => (
                <li key={`${link.platform}-${link.url}`}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </aside>
  );
}
