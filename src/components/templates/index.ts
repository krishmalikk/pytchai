import { ModernTemplate } from './ModernTemplate';
import { DarkTemplate } from './DarkTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { StartupTemplate } from './StartupTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { ThreeDTemplate } from './3DTemplate';
import { RetroTemplate } from './RetroTemplate';
import { CorporateTemplate } from './CorporateTemplate';
import { FuturisticTemplate } from './FuturisticTemplate';
import { NatureTemplate } from './NatureTemplate';

export interface TemplateProps {
  companyName: string;
  tagline: string;
  description: string;
  primaryColor: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  ctaText: string;
  ctaLink: string;
  showNav?: boolean;
}

export const templates = [
  ModernTemplate,
  DarkTemplate,
  MinimalTemplate,
  StartupTemplate,
  CreativeTemplate,
  ThreeDTemplate,
  RetroTemplate,
  CorporateTemplate,
  FuturisticTemplate,
  NatureTemplate,
];

export function getRandomTemplate() {
  return templates[Math.floor(Math.random() * templates.length)];
}

export { 
  ModernTemplate, 
  DarkTemplate, 
  MinimalTemplate, 
  StartupTemplate, 
  CreativeTemplate, 
  ThreeDTemplate, 
  RetroTemplate,
  CorporateTemplate,
  FuturisticTemplate,
  NatureTemplate
}; 