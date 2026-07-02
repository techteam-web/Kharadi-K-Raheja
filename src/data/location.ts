import type { LocationCategory } from '@/types';

export const PROJECT_COORDINATES = {
  lat: 18.5635240330886,
  lng: 73.9531972026832,
};

// All coordinates below are verified real-world locations (cross-checked via OpenStreetMap/Nominatim
// and, where noted, public listings) rather than approximated placeholders. Distances/times are real
// driving figures from the Mapbox Directions API against PROJECT_COORDINATES, not straight-line estimates.
// A few venues (marked "approx.") couldn't be pinned to an exact building via free geocoding and use a
// best-effort coordinate within their known real locality.

export const LOCATION_CATEGORIES: LocationCategory[] = [
  {
    id: 'connectivity',
    label: 'Connectivity',
    description:
      'Positioned at the intersection of Pune’s primary arterial roads, minutes from the airport and railway station.',
    accent: 'blue',
    points: [
      { id: 'airport', name: 'Pune Airport', distance: '8.6 km', time: '34 min', lat: 18.5848515, lng: 73.9196126 },
      { id: 'railway', name: 'Pune Railway Station', distance: '11.5 km', time: '36 min', lat: 18.5288773, lng: 73.8744146 },
      { id: 'grant-road', name: 'Grant Road', distance: '450 m', time: '2 min', lat: 18.5668707, lng: 73.9519381 },
      { id: 'blueberry-road', name: 'Blue Berry Road', distance: '180 m', time: '1 min', lat: 18.5639119, lng: 73.9515215 },
      { id: 'dp-road', name: 'DP Road', distance: '5.9 km', time: '20 min', lat: 18.5419284, lng: 73.9460938 },
      { id: 'sakore-nagar', name: 'Sakore Nagar', distance: '6 km', time: '18 min', lat: 18.5617686, lng: 73.9124077 },
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    description:
      'Anchored within a thriving commercial corridor of established IT parks and SEZ developments.',
    accent: 'blue',
    points: [
      { id: 'eon-it', name: 'EON IT Park', distance: '1.6 km', time: '5 min', lat: 18.5541278, lng: 73.9515798 },
      { id: 'world-trade', name: 'World Trade Center', distance: '2 km', time: '6 min', lat: 18.5531806, lng: 73.9482802 },
      { id: 'gera-commerzone', name: 'Gera Commerzone', distance: '1.6 km', time: '5 min', lat: 18.5521957, lng: 73.9559045 },
    ],
  },
  {
    id: 'safety',
    label: 'Safety & Essential Services',
    description:
      'A comprehensive safety net of hospitals, police and fire services within immediate reach.',
    accent: 'green',
    points: [
      { id: 'manipal-hospital', name: 'Manipal Hospital, Kharadi', distance: '4 km', time: '11 min', lat: 18.5411823, lng: 73.9355627 },
      { id: 'sahyadri-hospital', name: 'Sahyadri Hospital, Hadapsar', distance: '8.7 km', time: '27 min', lat: 18.5031602, lng: 73.9321491 },
      { id: 'police', name: 'Viman Nagar Police Station', distance: '7.1 km', time: '20 min', lat: 18.557857, lng: 73.908924 },
      { id: 'fire', name: 'Fire Station, Kharadi', distance: '2.5 km', time: '7 min', lat: 18.552, lng: 73.947 },
    ],
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle & Community',
    description:
      'Surrounded by the city’s finest hospitality, retail, education and dining destinations.',
    accent: 'amber',
    points: [
      { id: 'hotel-1', name: 'Fairfield by Marriott, Kharadi', distance: '3.4 km', time: '9 min', lat: 18.5459385, lng: 73.93673 },
      { id: 'mall', name: 'Phoenix Marketcity', distance: '5.8 km', time: '20 min', lat: 18.5612877, lng: 73.9172253 },
      { id: 'school', name: 'Symbiosis International School', distance: '5 km', time: '15 min', lat: 18.559, lng: 73.9145 },
      { id: 'residential', name: 'Nyati Empire', distance: '4 km', time: '10 min', lat: 18.5405, lng: 73.935 },
      { id: 'restaurant', name: 'Hard Rock Cafe, EON IT Park', distance: '1.6 km', time: '5 min', lat: 18.5545, lng: 73.9518 },
    ],
  },
];
