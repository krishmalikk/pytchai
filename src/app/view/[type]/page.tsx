'use client';

import React, { useEffect, useState } from 'react';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { StartupPitch } from '@/components/templates/StartupPitch';

export default function ViewPage({ params }: { params: { type: string } }) {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    // Get the content from localStorage
    const storedContent = localStorage.getItem('generatedContent');
    if (storedContent) {
      setContent(JSON.parse(storedContent));
    }
  }, []);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div id="content" className="min-h-screen">
      {params.type === 'website' ? (
        <ModernTemplate {...content} showNav={true} />
      ) : (
        <StartupPitch {...content} />
      )}
    </div>
  );
} 