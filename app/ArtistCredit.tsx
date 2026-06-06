'use client';

import {useEffect, useState} from 'react';
import {client} from '../sanity/client';

type CreditData = {
  artistName?: string;
  artistLink?: string;
};

const QUERY = `*[_type == "homepageBackground"][0]{artistName, artistLink}`;

export default function ArtistCredit() {
  const [data, setData] = useState<CreditData | null>(null);

  useEffect(() => {
    client
      .fetch<CreditData | null>(QUERY)
      .then((result) => {
        if (result) setData(result);
      })
      .catch(console.error);
  }, []);

  if (!data?.artistName || !data?.artistLink) return null;

  return (
    <a
      href={data.artistLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 50,
        fontFamily: 'var(--mono)',
        fontSize: '11px',
        letterSpacing: '0.05em',
        color: 'rgba(255,255,255,0.65)',
        textDecoration: 'none',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(4px)',
        padding: '4px 10px',
        transition: 'color 0.2s',
        display: 'block',
      }}
    >
      Photo: {data.artistName}
    </a>
  );
}
