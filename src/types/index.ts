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
  image: string;
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

export type PlanId = 'master' | 'ground' | 'typical' | 'floor-plate';

export interface PlanView {
  id: PlanId;
  label: string;
  image: string;
  hotspots: PlanHotspot[];
}

export type UnitStatus = 'available' | 'on-hold' | 'sold';

export type UnitFacing = 'North-East' | 'North' | 'East' | 'South-East' | 'West' | 'North-West';

export type UnitViewType = 'Cityscape view' | 'Garden view' | 'Avenue view' | 'Terrace view' | 'Skyline view';

export interface Unit {
  id: string;
  unitNo: string;
  tower: string;
  floor: number;
  floorLabel: string;
  carpet: number;
  saleable: number;
  facing: UnitFacing;
  view: UnitViewType;
  status: UnitStatus;
  ratePerSqft: number;
  price: number;
  highlights: string[];
}

export interface EsgSection {
  id: string;
  title: string[];
  body: string;
  metric: { value: string; label: string };
  image: string;
}

export interface BrochurePage {
  id: string;
  heading: string;
  body: string;
  image: string;
}
