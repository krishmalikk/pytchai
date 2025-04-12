import { ModernPitch } from './ModernPitch';
import { MinimalPitch } from './MinimalPitch';
import { StartupPitch } from './StartupPitch';
import { InvestorPitch } from './InvestorPitch';

export interface PitchDeckProps {
  companyName: string;
  logoUrl?: string;
  tagline: string;
  problem: {
    mainProblem: string;
    painPoints: string[];
    marketGaps: string;
    statistics: string[];
  };
  solution: {
    coreSolution: string;
    keyFeatures: string[];
    uniqueValue: string;
    techStack: string[];
    implementation: string;
  };
  marketSize: {
    tam: string;
    sam: string;
    som: string;
    growthRate: string;
    trends: string[];
  };
  businessModel: {
    revenueStreams: string[];
    pricing: {
      structure: string;
      tiers: string[];
    };
    customerAcquisition: string;
    margins: string;
  };
  competition: {
    directCompetitors: string[];
    indirectCompetitors: string[];
    advantages: string[];
    marketPositioning: string;
  };
  traction: {
    currentMetrics: {
      users: string;
      revenue: string;
      growth: string;
    };
    milestones: string[];
    partnerships: string[];
    testimonials: string[];
  };
  team: Array<{
    name: string;
    role: string;
    bio: string;
    achievements: string[];
    expertise: string[];
  }>;
  financials: {
    revenue: {
      current: string;
      projections: string[];
      assumptions: string[];
    };
    funding: {
      history: string;
      current: string;
      valuation: string;
    };
    metrics: {
      cac: string;
      ltv: string;
      burnRate: string;
    };
  };
  askAmount: {
    total: string;
    breakdown: string[];
    timeline: string;
    terms: string;
  };
  useOfFunds: {
    allocation: string[];
    milestones: string[];
    timeline: string;
  };
  primaryColor: string;
}

export const pitchTemplates = [
  ModernPitch,
  MinimalPitch,
  StartupPitch,
  InvestorPitch,
];

export function getRandomPitchTemplate() {
  return pitchTemplates[Math.floor(Math.random() * pitchTemplates.length)];
}

export {
  ModernPitch,
  MinimalPitch,
  StartupPitch,
  InvestorPitch,
}; 