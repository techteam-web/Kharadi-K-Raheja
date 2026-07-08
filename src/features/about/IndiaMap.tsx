import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { PAN_INDIA_CITIES } from '@/data/about';
import { useThemeStore } from '@/stores/useThemeStore';
import type { PortfolioCity } from '@/types';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

/** Bounding box covering mainland India, used to frame every portfolio city at once. */
const INDIA_BOUNDS: [[number, number], [number, number]] = [
  [68, 6],
  [97.5, 37.5],
];

/** Recolors the base map to match the app theme, without swapping the Mapbox style. */
function applyMapTheme(map: mapboxgl.Map, theme: 'light' | 'dark') {
  const isDark = theme === 'dark';
  if (map.getLayer('background')) map.setPaintProperty('background', 'background-color', isDark ? '#0c0d11' : '#fafafa');
  if (map.getLayer('land')) map.setPaintProperty('land', 'background-color', isDark ? '#0c0d11' : '#fafafa');
  if (map.getLayer('water')) map.setPaintProperty('water', 'fill-color', isDark ? '#0a1018' : '#eaf1f8');
}

/** A plain-DOM marker (Mapbox markers live outside the React tree) with a hover-revealed tooltip. */
function buildCityMarkerElement(city: PortfolioCity) {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'relative flex flex-col items-center outline-none';

  const dotWrap = document.createElement('span');
  dotWrap.className = 'relative flex h-4 w-4 items-center justify-center';
  const ring = document.createElement('span');
  ring.className = 'absolute h-3 w-3 rounded-full bg-blue opacity-35 transition-transform duration-500 ease-out';
  const dot = document.createElement('span');
  dot.className = 'relative h-2 w-2 rounded-full border border-white/80 bg-blue shadow transition-transform duration-300 ease-out';
  dotWrap.append(ring, dot);

  const tooltip = document.createElement('span');
  tooltip.className =
    'glass-strong pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-xl px-3 py-2 opacity-0 transition-opacity duration-200';
  tooltip.innerHTML = `
    <span class="block text-sm font-medium text-ink">${city.name}</span>
    <span class="label-caps mt-0.5 block text-ink-muted">${city.projects} Projects</span>
  `;

  el.append(dotWrap, tooltip);

  el.addEventListener('mouseenter', () => {
    ring.style.transform = 'scale(2.4)';
    ring.style.opacity = '0';
    dot.style.transform = 'scale(1.3)';
    tooltip.style.opacity = '1';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform = 'scale(1)';
    ring.style.opacity = '0.35';
    dot.style.transform = 'scale(1)';
    tooltip.style.opacity = '0';
  });

  return el;
}

export function IndiaMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    if (!containerRef.current || !MAPBOX_TOKEN) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      bounds: INDIA_BOUNDS,
      fitBoundsOptions: { padding: 20 },
      attributionControl: false,
      // Small presentational widget embedded in a scrolling page — no pan/zoom/rotate.
      interactive: false,
    });
    mapRef.current = map;

    map.on('load', () => {
      // Minimal labels — hide default place/road text so our own pins carry the information.
      map.getStyle()?.layers?.forEach((layer) => {
        if (layer.type === 'symbol') {
          map.setLayoutProperty(layer.id, 'visibility', 'none');
        }
      });

      applyMapTheme(map, useThemeStore.getState().theme);

      PAN_INDIA_CITIES.forEach((city) => {
        new mapboxgl.Marker({ element: buildCityMarkerElement(city), anchor: 'bottom' })
          .setLngLat([city.lng, city.lat])
          .addTo(map);
      });

      setMapReady(true);
    });

    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Recolor the base map live whenever the app theme is toggled.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    applyMapTheme(map, theme);
  }, [theme, mapReady]);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex aspect-[3/4] w-full max-w-[180px] mx-auto items-center justify-center rounded-2xl bg-surface sm:max-w-[260px] lg:max-w-md">
        <p className="max-w-[80%] text-center text-xs text-ink-muted">Map unavailable.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto aspect-[3/4] w-full max-w-[180px] overflow-hidden rounded-2xl sm:max-w-[260px] lg:max-w-md"
    />
  );
}
