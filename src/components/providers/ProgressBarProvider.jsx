'use client';

import { AppProgressBar } from 'next-nprogress-bar';

export default function ProgressBarProvider({ children }) {
  return (
    <>
      <AppProgressBar
        color="#1e40af"
        height="4px"
        options={{ showSpinner: false }}
      />
      {children}
    </>
  );
}
