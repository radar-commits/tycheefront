'use client';

import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {client, urlFor, type SanityImageSource} from '../sanity/client';

const GridDistortion = dynamic(() => import('./GridDistortion'), {ssr: false});

type HomepageBg = {
  backgroundImage?: SanityImageSource;
  artistName?: string;
  artistLink?: string;
};

const QUERY = `*[_type == "homepageBackground"][0]{
  backgroundImage,
  artistName,
  artistLink
}`;

const FALLBACK_IMAGE = '/bg%20website.jpg';

export default function HomepageBackground() {
  const [data, setData] = useState<HomepageBg | null>(null);

  useEffect(() => {
    client.fetch<HomepageBg | null>(QUERY).then(setData).catch(console.error);
  }, []);

  const imageSrc =
    data?.backgroundImage
      ? urlFor(data.backgroundImage).width(1920).url()
      : FALLBACK_IMAGE;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100vw',
        height: '100vh',
      }}
    >
      <GridDistortion
        imageSrc={imageSrc}
        grid={10}
        mouse={0.1}
        strength={0.15}
        relaxation={0.9}
      />
    </div>
  );
}
