import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { PROJECT_COORDINATES } from '@/data/location';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const SITE: [number, number] = [PROJECT_COORDINATES.lng, PROJECT_COORDINATES.lat];

function buildSiteMarkerElement() {
  const el = document.createElement('div');
  el.className = 'flex flex-col items-center gap-1.5';
  el.innerHTML = `
    <span class="glass rounded-full px-3.5 py-1.5 whitespace-nowrap">
      <span class="label-caps text-ink">Kharadi 57</span>
    </span>
    <span class="h-3.5 w-3.5 rounded-full border-2 border-white/80 bg-blue shadow"></span>
  `;
  return el;
}

/**
 * A simple, mostly-static locator map for the Contact page — real geography and
 * real place labels (unlike the Location page's stripped-down ArchViz explorer),
 * since the goal here is just "here's where we are", not a guided experience.
 */
export function ContactMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !MAPBOX_TOKEN) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: SITE,
      zoom: 14.5,
      pitch: 0,
      attributionControl: false,
      // Embedded map inside a scrollable page — require Ctrl/Cmd+scroll to zoom
      // so a normal page-scroll gesture over the map doesn't get trapped by it.
      cooperativeGestures: true,
    });
    mapRef.current = map;
    map.on('error', () => setError(true));

    map.on('load', () => {
      if (map.getLayer('background')) map.setPaintProperty('background', 'background-color', '#fafafa');
      if (map.getLayer('land')) map.setPaintProperty('land', 'background-color', '#fafafa');
      if (map.getLayer('water')) map.setPaintProperty('water', 'fill-color', '#eaf1f8');

      new mapboxgl.Marker({ element: buildSiteMarkerElement(), anchor: 'bottom' }).setLngLat(SITE).addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  if (!MAPBOX_TOKEN || error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-surface">
        <p className="max-w-xs text-center text-sm text-ink-muted">Map unavailable.</p>
      </div>
    );
  }

  return <div ref={containerRef} className="h-full w-full" />;
}
