export interface Generation {
  id: string;
  type: 'website' | 'pitchdeck';
  title: string;
  createdAt: Date;
  content: {
    companyName: string;
    tagline: string;
    description: string;
    primaryColor: string;
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    ctaText: string;
    ctaLink: string;
  };
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  generations: Generation[];
} 