import {
  Home,
  Info,
  MapPin,
  View,
  Building2,
  LayoutGrid,
  Building,
  Leaf,
  BookOpen,
  Mail,
} from 'lucide-react';
import type { NavItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', path: '/', icon: Home },
  { id: 'about', label: 'About', path: '/about', icon: Info },
  { id: 'location', label: 'Location', path: '/location', icon: MapPin },
  { id: '360', label: '360 Views', path: '/360-views', icon: View },
  {
    id: 'project-details',
    label: 'Project Details',
    path: '/project-details',
    icon: Building2,
  },
  { id: 'plans', label: 'Plans', path: '/plans', icon: LayoutGrid },
  {
    id: 'office-floors',
    label: 'Office Floors',
    path: '/office-floors',
    icon: Building,
  },
  { id: 'esg', label: 'ESG', path: '/esg', icon: Leaf },
  { id: 'brochure', label: 'E-Brochure', path: '/e-brochure', icon: BookOpen },
  { id: 'contact', label: 'Contact', path: '/contact', icon: Mail },
];
