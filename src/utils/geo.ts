export interface LngLat {
  lng: number;
  lat: number;
}

/** Forward azimuth (compass bearing, degrees) from `origin` to `target`. */
export function bearingBetween(origin: LngLat, target: LngLat): number {
  const lat1 = (origin.lat * Math.PI) / 180;
  const lat2 = (target.lat * Math.PI) / 180;
  const dLng = ((target.lng - origin.lng) * Math.PI) / 180;

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}
