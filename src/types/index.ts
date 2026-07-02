import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
}

export type LocationCategoryId =
  | 'connectivity'
  | 'infrastructure'
  | 'safety'
  | 'lifestyle';

export interface LocationPoi {
  id: string;
  name: string;
  /** Real driving distance from the site, via Mapbox Directions */
  distance: string;
  /** Real driving time from the site, via Mapbox Directions */
  time?: string;
  /** Verified real-world coordinate */
  lng: number;
  lat: number;
}

export interface LocationCategory {
  id: LocationCategoryId;
  label: string;
  description: string;
  accent: 'blue' | 'green' | 'amber';
  points: LocationPoi[];
}

export interface PortfolioCity {
  id: string;
  name: string;
  projects: number;
  /** Position as a percentage within the India map bounding box */
  x: number;
  y: number;
}

export interface PortfolioStat {
  value: string;
  label: string;
}

export interface BusinessVertical {
  id: string;
  title: string;
  description: string;
  brands: string[];
}

export interface CorePrinciple {
  id: string;
  title: string;
  description: string;
}

export interface TimelineMilestone {
  year: string;
  label: string;
}

export interface PuneProject {
  id: string;
  name: string;
  type: string;
  status: string;
}

export type ProjectDetailCategoryId = 'exterior' | 'interior' | 'amenities';

export interface ProjectDetailItem {
  id: string;
  title: string;
  description: string;
  tone: 'cool' | 'warm';
}

export interface ProjectDetailCategory {
  id: ProjectDetailCategoryId;
  label: string;
  items: ProjectDetailItem[];
}

export interface PlanHotspot {
  id: string;
  label: string;
  x: number;
  y: number;
}

export type PlanId = 'master' | 'ground' | 'typical';

export interface PlanView {
  id: PlanId;
  label: string;
  hotspots: PlanHotspot[];
}

export interface EsgSection {
  id: string;
  title: string[];
  body: string;
  metric: { value: string; label: string };
}

export interface BrochurePage {
  id: string;
  heading: string;
  body: string;
}
