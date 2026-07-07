import type { UnitStatus } from '@/types';

export const UNIT_STATUS_META: Record<UnitStatus, { label: string; color: string }> = {
  available: { label: 'Available', color: '#00A651' },
  'on-hold': { label: 'On Hold', color: '#B8763E' },
  sold: { label: 'Sold', color: '#8F897C' },
};

export const UNIT_STATUS_ORDER: UnitStatus[] = ['available', 'on-hold', 'sold'];
