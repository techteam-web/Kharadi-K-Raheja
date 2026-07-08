import type { PlanView, EsgSection, BrochurePage } from '@/types';
import masterLayoutPlan from '@/assets/images/Master layout Plan.webp';
import groundFloorPlan from '@/assets/images/Ground Floor plan.webp';
import typicalOfficeFloorPlan from '@/assets/images/Typical office floor plan.webp';
import esgPlanetImage from '@/assets/images/esg-planet.webp';
import esgEfficiencyImage from '@/assets/images/esg-efficiency.webp';
import esgWaterImage from '@/assets/images/esg-water.webp';
import heroImage from '@/assets/images/hero.webp';
import facadeImage from '@/assets/images/detail-facade.webp';
import brochureLocationImage from '@/assets/images/brochure-location.webp';
import brochureDesignImage from '@/assets/images/brochure-design.webp';
import brochureContactImage from '@/assets/images/brochure-contact.webp';

export const PLAN_VIEWS: PlanView[] = [
  {
    id: 'master',
    label: 'Master Layout',
    image: masterLayoutPlan,
    hotspots: [
      { id: 'tower', label: 'Tower', x: 50, y: 42 },
      { id: 'entry', label: 'Main Entry', x: 50, y: 78 },
      { id: 'garden', label: 'Landscape Garden', x: 22, y: 55 },
      { id: 'parking-entry', label: 'Parking Entry', x: 78, y: 60 },
    ],
  },
  {
    id: 'ground',
    label: 'Ground Floor',
    image: groundFloorPlan,
    hotspots: [
      { id: 'lobby', label: 'Lobby', x: 50, y: 50 },
      { id: 'retail', label: 'Retail Frontage', x: 28, y: 65 },
      { id: 'lifts', label: 'Lift Lobby', x: 62, y: 40 },
    ],
  },
  {
    id: 'typical',
    label: 'Typical Office Floor',
    image: typicalOfficeFloorPlan,
    hotspots: [
      { id: 'core', label: 'Central Core', x: 50, y: 50 },
      { id: 'floorplate', label: 'Efficient Floorplate', x: 30, y: 30 },
      { id: 'terrace', label: 'Break-out Terrace', x: 75, y: 70 },
    ],
  },
];

export const ESG_SECTIONS: EsgSection[] = [
  {
    id: 'planet',
    title: ['Built with', 'Planet Consciousness'],
    body: 'Every material and system decision is measured against its environmental cost — from responsibly sourced stone to low-VOC finishes throughout.',
    metric: { value: '30%', label: 'Lower embodied carbon vs. baseline' },
    image: esgPlanetImage,
  },
  {
    id: 'efficiency',
    title: ['Designed for', 'Long Term Efficiency'],
    body: 'High-performance glazing, intelligent HVAC zoning and daylight-responsive lighting reduce operating energy across the building’s lifetime.',
    metric: { value: '40%', label: 'Reduction in operational energy' },
    image: esgEfficiencyImage,
  },
  {
    id: 'water',
    title: ['Water', 'Infrastructure'],
    body: 'Rainwater harvesting, greywater recycling and low-flow fixtures return water to the site rather than the storm drain.',
    metric: { value: '100%', label: 'Landscape irrigation from recycled water' },
    image: esgWaterImage,
  },
];

export const BROCHURE_PAGES: BrochurePage[] = [
  {
    id: 'cover',
    heading: 'Kharadi 57',
    body: 'Experience the Future of Business.',
    image: heroImage,
  },
  {
    id: 'overview',
    heading: 'Overview',
    body: 'A Grade-A commercial address in the heart of Kharadi, engineered for tomorrow’s enterprise.',
    image: facadeImage,
  },
  {
    id: 'location',
    heading: 'Location',
    body: '8.6 km from Pune Airport. Minutes from the city’s leading IT and business corridors.',
    image: brochureLocationImage,
  },
  {
    id: 'design',
    heading: 'Design',
    body: 'Efficient floorplates, double-height lobbies and a facade composed for the long term.',
    image: brochureDesignImage,
  },
  {
    id: 'sustainability',
    heading: 'Sustainability',
    body: 'Built with planet consciousness — from material sourcing to water infrastructure.',
    image: esgPlanetImage,
  },
  {
    id: 'contact',
    heading: 'Get in Touch',
    body: 'sales@krahejacorp.com — +91 20 XXXX XXXX',
    image: brochureContactImage,
  },
];
