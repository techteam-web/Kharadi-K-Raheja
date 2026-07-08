import type { ProjectDetailCategory } from '@/types';
import facadeImage from '@/assets/images/detail-facade.webp';
import dropOffImage from '@/assets/images/detail-drop-off.webp';
import securityImage from '@/assets/images/detail-security.webp';
import ambulanceImage from '@/assets/images/detail-ambulance.webp';
import lobbyImage from '@/assets/images/detail-lobby.webp';
import liftLobbyImage from '@/assets/images/detail-lift-lobby.webp';
import parkingImage from '@/assets/images/detail-parking.webp';
import landscapeImage from '@/assets/images/detail-landscape.webp';
import fnbImage from '@/assets/images/detail-fnb.webp';
import businessCenterImage from '@/assets/images/detail-business-center.webp';

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
        image: facadeImage,
      },
      {
        id: 'drop-off',
        title: 'Drop Off',
        description:
          'A covered porte-cochère arrival sequence, designed to receive guests with the ease of a five-star lobby.',
        image: dropOffImage,
      },
      {
        id: 'security',
        title: '24x7 Security',
        description:
          'Multi-layered perimeter security with round-the-clock surveillance and access-controlled entry points.',
        image: securityImage,
      },
      {
        id: 'ambulance',
        title: 'Ambulance Assistance',
        description:
          'On-call emergency medical assistance integrated into the building’s facilities management protocol.',
        image: ambulanceImage,
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
        image: lobbyImage,
      },
      {
        id: 'lift-lobby',
        title: 'Lift Lobby',
        description:
          'High-speed destination-controlled elevators arranged around a considered, art-ready lobby.',
        image: liftLobbyImage,
      },
      {
        id: 'parking',
        title: 'Parking',
        description:
          'Multi-level basement parking with dedicated visitor bays and EV charging infrastructure.',
        image: parkingImage,
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
        image: landscapeImage,
      },
      {
        id: 'fnb',
        title: 'F&B Plaza',
        description:
          'A dedicated dining plaza bringing together considered food and beverage operators.',
        image: fnbImage,
      },
      {
        id: 'business-center',
        title: 'Business Center',
        description:
          'Fully serviced meeting suites and business support facilities for occupiers and their guests.',
        image: businessCenterImage,
      },
    ],
  },
];
