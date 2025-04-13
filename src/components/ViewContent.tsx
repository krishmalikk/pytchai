'use client';

import React, { useEffect, useState } from 'react';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { StartupPitch } from '@/components/templates/StartupPitch';

export function ViewContent({ type }: { type: string }) {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    // Get the content from localStorage
    const storedContent = localStorage.getItem('generatedContent');
    if (storedContent) {
      setContent(JSON.parse(storedContent));
    }
  }, []);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#f97316]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {type === 'website' ? (
        <ModernTemplate {...content} showNav={true} />
      ) : (
        <StartupPitch {...content} />
      )}
    </div>
  );
} 