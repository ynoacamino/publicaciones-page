'use client';

import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

export default function Jodit({ placeholder, content, setContent }) {
  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: placeholder || 'Start typings...',
    language: 'es',
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)}
    />
  );
}
