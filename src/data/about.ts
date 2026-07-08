import type {
  BusinessVertical,
  CorePrinciple,
  PortfolioCity,
  PortfolioStat,
  PuneProject,
  TimelineMilestone,
} from '@/types';

// Company facts below are cross-checked against krahejacorp.com, Wikipedia, Mindspace Business
// Parks REIT's own portfolio disclosure, and Chalet Hotels' investor materials — not invented figures.

// Real city-center coordinates (verified via OpenStreetMap/Nominatim), matching the
// verification standard already used for src/data/location.ts.
export const PAN_INDIA_CITIES: PortfolioCity[] = [
  { id: 'delhi-ncr', name: 'Delhi NCR', projects: 6, lat: 28.6139, lng: 77.209 },
  { id: 'mumbai', name: 'Mumbai', projects: 16, lat: 19.076, lng: 72.8777 },
  { id: 'navi-mumbai', name: 'Navi Mumbai', projects: 4, lat: 19.033, lng: 73.0297 },
  { id: 'vadodara', name: 'Vadodara', projects: 3, lat: 22.3072, lng: 73.1812 },
  { id: 'goa', name: 'Goa', projects: 2, lat: 15.4909, lng: 73.8278 },
  { id: 'pune', name: 'Pune', projects: 12, lat: 18.5204, lng: 73.8567 },
  { id: 'hyderabad', name: 'Hyderabad', projects: 7, lat: 17.385, lng: 78.4867 },
  { id: 'bangalore', name: 'Bengaluru', projects: 5, lat: 12.9716, lng: 77.5946 },
  { id: 'chennai', name: 'Chennai', projects: 3, lat: 13.0827, lng: 80.2707 },
];

export const COMPANY_STATS: PortfolioStat[] = [
  { value: '1956', label: 'Year Founded' },
  { value: '70+', label: 'Years of Legacy' },
  { value: '39M+', label: 'Sq. Ft. Commercial Portfolio' },
  { value: '5', label: 'Business Verticals' },
];

export const BUSINESS_VERTICALS: BusinessVertical[] = [
  {
    id: 'commercial',
    title: 'Commercial',
    description:
      'Integrated business parks and office campuses built for global enterprises, developed under the Mindspace and Commerzone brands across India’s key office markets.',
    brands: ['Mindspace Business Parks', 'Commerzone'],
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    description:
      'Through Chalet Hotels, the Group owns and operates high-end hotels across India’s metro cities in partnership with globally recognized brands.',
    brands: ['JW Marriott', 'The Westin', 'Four Points by Sheraton', 'Novotel'],
  },
  {
    id: 'retail',
    title: 'Retail & Lifestyle',
    description:
      'K Raheja Corp pioneered organized retail in India, opening the country’s first multi-brand store and going on to build a nationwide retail footprint.',
    brands: ['Shoppers Stop', 'Inorbit Malls', 'Crossword Bookstores'],
  },
  {
    id: 'residential',
    title: 'Residential Communities',
    description:
      'Luxury residential developments across India’s leading cities, designed with a focus on craftsmanship, sustainability and long-term value.',
    brands: ['K Raheja Corp Homes'],
  },
];

export const VISION_STATEMENT =
  'To be a trusted leader in the real estate industry, creating enduring experiences for customers, partners, employees, and communities alike.';

export const CORE_PRINCIPLES: CorePrinciple[] = [
  {
    id: 'integrity',
    title: 'Integrity',
    description: 'Building relationships founded on trust, transparency, and long-term commitment.',
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Continuously redefining urban experiences through design, technology, and sustainable thinking.',
  },
  {
    id: 'excellence',
    title: 'Excellence',
    description: 'Delivering world-class developments that stand the test of time.',
  },
  {
    id: 'responsibility',
    title: 'Responsibility',
    description:
      'Creating environmentally responsible assets that contribute positively to communities and future generations.',
  },
];

export const TIMELINE: TimelineMilestone[] = [
  { year: '1956', label: 'K Raheja Corp founded in Mumbai' },
  { year: '1991', label: 'Shoppers Stop opens — India’s first multi-brand retail store' },
  { year: '2004', label: 'Inorbit Mall, Malad — flagship retail debut' },
  { year: '2019', label: 'Chalet Hotels lists on the Indian stock exchanges' },
  { year: '2020', label: 'Mindspace Business Parks REIT lists — India’s second listed REIT' },
  { year: '2026', label: 'Kharadi 57' },
];

export const COMMERCIAL_FEATURES = [
  'Premium Grade-A office infrastructure',
  'Integrated public realms',
  'Landscaped campuses',
  'Pedestrian-first planning',
  'Retail and F&B activation',
  'ESG-led development principles',
  'Long-term operational efficiency',
];

export const PUNE_PORTFOLIO: PuneProject[] = [
  {
    id: 'kharadi-57',
    name: 'Kharadi 57',
    type: 'Commercial',
    status: 'Ongoing',
  },
  {
    id: 'commerzone-yerwada',
    name: 'Commerzone, Yerwada',
    type: 'IT Park',
    status: 'Operational',
  },
  {
    id: 'gera-commerzone-kharadi',
    name: 'Gera Commerzone, Kharadi',
    type: 'IT Park / SEZ',
    status: 'Operational',
  },
  {
    id: 'the-square-nagar-road',
    name: 'The Square, Nagar Road',
    type: 'Business Chambers',
    status: 'Operational',
  },
];
