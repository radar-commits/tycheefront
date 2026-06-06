'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import ReleaseBanner from './ReleaseBanner';
import HomepageBackground from './HomepageBackground';
import ArtistCredit from './ArtistCredit';

const ModelViewer = dynamic(() => import('./ModelViewer'), { ssr: false });

type Platform = {
  name: string;
  url: string;
  iconSrc: string;
};

const platforms: Platform[] = [
  { name: 'Spotify',       url: 'https://open.spotify.com/artist/7fhcAWTceDwzmoOVMKhQYI?si=eI4sLCQWR5KUg8VjIY1Z2Q', iconSrc: '/spotify.svg' },
  { name: 'Apple Music',   url: 'https://music.apple.com/gb/artist/tychee/1759296963', iconSrc: '/apple_music.svg' },
  { name: 'SoundCloud',    url: 'https://soundcloud.com/tycheeee?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', iconSrc: '/soundcloud.svg'},
  { name: 'YouTube Music', url: 'https://www.youtube.com/channel/UCuJk8MDznEsH1MZv7ONqqtQ', iconSrc: '/youtube_music.svg' },
  { name: 'Tidal',         url: 'https://tidal.com/artist/33997441', iconSrc: '/tidal.svg' },
  { name: 'Amazon Music',  url: 'https://music.amazon.co.uk/artists/B0BBKJBS4T/tychee', iconSrc: '/amazon_music.svg' },
];

export default function Home() {
  const [listenOpen, setListenOpen] = useState(false);

  return (
    <>
      <ReleaseBanner />

      <HomepageBackground />
      <ArtistCredit />

      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        padding: "100px",
        gap: 'var(--space-xl)',
        position: 'relative',
        zIndex: 1,
        pointerEvents: 'none',
      }}>
        <div>
          <ModelViewer />
        </div>

        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-lg)',
          pointerEvents: 'auto',
          textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)',
        }}>
          <button className="site-link" onClick={() => setListenOpen(true)}>
            Listen
          </button>
          <a href="#" className="text-20px site-link">Watch</a>
          <Link href="/shop" className="site-link">Shop</Link>
        </nav>
      </main>

      {listenOpen && (
        <div className="modal-overlay" onClick={() => setListenOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setListenOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <ul className="platform-list">
              {platforms.map(({ name, url, iconSrc }) => (
                <li key={name}>
                  <a
                    href={url}
                    className="platform-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={iconSrc}
                      width={20}
                      height={20}
                      alt={name}
                      className="platform-icon"
                    />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
