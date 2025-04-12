'use client';

import { templates, type TemplateProps } from '@/components/templates';
import { useSearchParams } from 'next/navigation';

export default function PreviewPage() {
  const searchParams = useSearchParams();
  
  try {
    const mockupDataStr = searchParams.get('data');
    const templateIndex = parseInt(searchParams.get('template') || '0');
    
    if (!mockupDataStr) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">No preview data found</p>
        </div>
      );
    }

    const mockupData: TemplateProps = JSON.parse(decodeURIComponent(mockupDataStr));
    const Template = templates[templateIndex];

    return (
      <div className="min-h-screen">
        <Template {...mockupData} />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading preview</p>
      </div>
    );
  }
} 