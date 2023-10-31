'use client';

import Script from 'next/script';

export default function YoutubeFragment() {
  return (
    <Script
      src="https://www.youtube.com/embed/Dl8x8EWXq8s?si=udJy8kAA8-XHbnCC"
      strategy="lazyOnload"
      id="123123"
    />
  );
}
