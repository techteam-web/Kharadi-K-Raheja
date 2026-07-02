import type { ProjectDetailCategory } from '@/types';

export const PROJECT_DETAIL_CATEGORIES: ProjectDetailCategory[] = [
  {
    id: 'exterior',
    label: 'Exterior',
    items: [
      {
        id: 'facade',
        title: 'Facade',
        description:
          'A double-height glazed facade in glass and stone, composed for a quiet civic presence on Kharadi’s skyline.',
        tone: 'cool',
      },
      {
        id: 'drop-off',
        title: 'Drop Off',
        description:
          'A covered porte-cochère arrival sequence, designed to receive guests with the ease of a five-star lobby.',
        tone: 'cool',
      },
      {
        id: 'security',
        title: '24x7 Security',
        description:
          'Multi-layered perimeter security with round-the-clock surveillance and access-controlled entry points.',
        tone: 'cool',
      },
      {
        id: 'ambulance',
        title: 'Ambulance Assistance',
        description:
          'On-call emergency medical assistance integrated into the building’s facilities management protocol.',
        tone: 'warm',
      },
    ],
  },
  {
    id: 'interior',
    label: 'Interior',
    items: [
      {
        id: 'lobby',
        title: 'Lobby',
        description:
          'A double-height reception volume finished in natural stone, walnut and brushed brass detailing.',
        tone: 'warm',
      },
      {
        id: 'lift-lobby',
        title: 'Lift Lobby',
        description:
          'High-speed destination-controlled elevators arranged around a considered, art-ready lobby.',
        tone: 'warm',
      },
      {
        id: 'parking',
        title: 'Parking',
        description:
          'Multi-level basement parking with dedicated visitor bays and EV charging infrastructure.',
        tone: 'cool',
      },
    ],
  },
  {
    id: 'amenities',
    label: 'Amenities',
    items: [
      {
        id: 'landscape',
        title: 'Landscape Garden',
        description:
          'A curated podium-level garden offering a quiet counterpoint to the working day.',
        tone: 'warm',
      },
      {
        id: 'fnb',
        title: 'F&B Plaza',
        description:
          'A dedicated dining plaza bringing together considered food and beverage operators.',
        tone: 'warm',
      },
      {
        id: 'business-center',
        title: 'Business Center',
        description:
          'Fully serviced meeting suites and business support facilities for occupiers and their guests.',
        tone: 'cool',
      },
    ],
  },
];
