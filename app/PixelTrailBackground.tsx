'use client';

import dynamic from 'next/dynamic';

const PixelTrail = dynamic(() => import('./PixelTrail'), { ssr: false });

// Full-screen pixel-trail background layer in the site highlight color.
// Sits behind page content (see .pixel-trail-bg in globals.css).
export default function PixelTrailBackground() {
  return (
    <div className="pixel-trail-bg" aria-hidden="true">
      <PixelTrail
        gridSize={50}
        trailSize={0.05}
        maxAge={250}
        interpolate={5}
        color="#fff708"
        gooeyFilter={{ id: 'custom-goo-filter', strength: 2 }}
      />
    </div>
  );
}
