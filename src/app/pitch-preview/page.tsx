'use client';

import { pitchTemplates, type PitchDeckProps } from '@/components/pitch-templates';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PitchPreviewContent() {
  const searchParams = useSearchParams();
  
  try {
    const pitchDataStr = searchParams.get('data');
    const templateIndex = parseInt(searchParams.get('template') || '0');
    
    if (!pitchDataStr) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">No pitch deck data found</p>
        </div>
      );
    }

    const pitchData: PitchDeckProps = JSON.parse(decodeURIComponent(pitchDataStr));
    const Template = pitchTemplates[templateIndex];

    return (
      <div className="min-h-screen">
        <Template {...pitchData} />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading pitch deck</p>
      </div>
    );
  }
}

export default function PitchPreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading pitch deck...</p>
      </div>
    }>
      <PitchPreviewContent />
    </Suspense>
  );
} 