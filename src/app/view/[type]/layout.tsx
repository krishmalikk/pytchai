export function generateMetadata({ params }: { params: { type: string } }) {
  return {
    title: `View ${params.type === 'website' ? 'Website' : 'Pitch Deck'} | Pytch`,
    description: `View your generated ${params.type === 'website' ? 'website' : 'pitch deck'} in full screen.`,
  };
}

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 