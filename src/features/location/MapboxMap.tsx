import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LOCATION_CATEGORIES, PROJECT_COORDINATES } from '@/data/location';
import { useLocationStore } from '@/stores/useLocationStore';
import { ACCENT_HEX } from './accent';
import { bearingBetween } from '@/utils/geo';
import type { LocationPoi } from '@/types';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const SITE: [number, number] = [PROJECT_COORDINATES.lng, PROJECT_COORDINATES.lat];

/** Close approximation of the app's shared architectural ease (cubic-bezier(0.22,1,0.36,1)) for Mapbox camera moves. */
function architecturalEase(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function lerpLine(from: [number, number], to: [number, number], t: number): [number, number][] {
  return [from, [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t]];
}

/** Camera padding must clear the overlay UI, which is laid out very differently at each breakpoint. */
function getBoundsPadding(containerWidth: number) {
  if (containerWidth < 640) {
    // Category tabs across the top, full-width POI sheet across the bottom.
    return { top: 110, bottom: 220, left: 24, right: 24 };
  }
  if (containerWidth < 1024) {
    return { top: 130, bottom: 260, left: 32, right: 32 };
  }
  // Desktop: title + tabs across the top, a 340px POI panel floating bottom-left.
  return { top: 160, bottom: 140, left: 400, right: 140 };
}

function buildMarkerElement(point: LocationPoi, color: string, isActive: boolean, onClick: () => void) {
  const el = document.createElement('button');
  el.setAttribute('type', 'button');
  el.className = 'group flex flex-col items-center gap-1.5';
  el.innerHTML = `
    <span
      class="rounded-md border bg-paper px-3 py-1.5 whitespace-nowrap transition-all duration-300"
      style="border-color:${isActive ? color : '#e8e8e8'}; box-shadow:${
        isActive ? `0 6px 20px ${color}33` : '0 2px 8px rgba(0,0,0,0.08)'
      }"
    >
      <span class="block text-[0.8rem] font-medium text-ink">${point.name}</span>
      <span class="label-caps mt-0.5 block" style="color:${color}">${point.distance}${
        point.time ? ` · ${point.time}` : ''
      }</span>
    </span>
    <span class="h-3 w-3 rounded-full border-2 border-paper shadow" style="background-color:${color}"></span>
  `;
  el.addEventListener('click', onClick);
  return el;
}

function buildSiteElement() {
  const el = document.createElement('div');
  el.className = 'flex flex-col items-center gap-1.5';
  el.innerHTML = `
    <span class="rounded-md border border-hairline bg-paper px-3 py-1.5 shadow-md whitespace-nowrap">
      <span class="label-caps text-ink">Kharadi 57</span>
    </span>
    <span class="h-3.5 w-3.5 rounded-full border-2 border-paper bg-blue shadow"></span>
  `;
  return el;
}

export function MapboxMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const siteMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const rafRef = useRef<number | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const activeCategory = useLocationStore((s) => s.activeCategory);
  const activePoiId = useLocationStore((s) => s.activePoiId);
  const setActivePoi = useLocationStore((s) => s.setActivePoi);

  // Initialize the map once.
  useEffect(() => {
    if (!containerRef.current || !MAPBOX_TOKEN) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: SITE,
      zoom: 15.2,
      pitch: 55,
      bearing: -20,
      antialias: true,
      attributionControl: false,
    });
    mapRef.current = map;

    map.on('load', () => {
      // Minimal labels — hide default POI/road/place text so our own pins carry the information.
      map.getStyle()?.layers?.forEach((layer) => {
        if (layer.type === 'symbol') {
          map.setLayoutProperty(layer.id, 'visibility', 'none');
        }
      });

      // Recolor the base map toward the brand palette instead of default Google-Maps-style greens/yellows.
      if (map.getLayer('background')) map.setPaintProperty('background', 'background-color', '#fafafa');
      if (map.getLayer('land')) map.setPaintProperty('land', 'background-color', '#fafafa');
      if (map.getLayer('water')) map.setPaintProperty('water', 'fill-color', '#eaf1f8');

      // White ArchViz-style extruded buildings from real Kharadi footprints.
      if (map.getSource('composite') && !map.getLayer('kharadi-3d-buildings')) {
        map.addLayer({
          id: 'kharadi-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          type: 'fill-extrusion',
          minzoom: 13,
          paint: {
            'fill-extrusion-color': '#ffffff',
            'fill-extrusion-height': ['coalesce', ['get', 'height'], 8],
            'fill-extrusion-base': ['coalesce', ['get', 'min_height'], 0],
            'fill-extrusion-opacity': 0.92,
            'fill-extrusion-vertical-gradient': true,
          },
        });
      }

      map.addSource('routes', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      map.addLayer({
        id: 'routes-line',
        type: 'line',
        source: 'routes',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 2.5,
          'line-opacity': 0.85,
        },
      });

      siteMarkerRef.current = new mapboxgl.Marker({ element: buildSiteElement(), anchor: 'bottom' })
        .setLngLat(SITE)
        .addTo(map);

      setMapReady(true);
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      markersRef.current.forEach((m) => m.remove());
      siteMarkerRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Re-render markers/routes and fly the camera whenever the active category or POI changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const category = LOCATION_CATEGORIES.find((c) => c.id === activeCategory);
    if (!category) return;
    const color = ACCENT_HEX[category.accent];

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = category.points.map((point) => {
      const el = buildMarkerElement(point, color, activePoiId === point.id, () =>
        setActivePoi(activePoiId === point.id ? null : point.id),
      );
      return new mapboxgl.Marker({ element: el, anchor: 'bottom' }).setLngLat([point.lng, point.lat]).addTo(map);
    });

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const duration = 900;

    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = architecturalEase(t);
      const features = category.points.map((point, i) => {
        const local = Math.min(1, Math.max(0, (eased - i * 0.06) / (1 - i * 0.06)));
        return {
          type: 'Feature' as const,
          properties: { color },
          geometry: { type: 'LineString' as const, coordinates: lerpLine(SITE, [point.lng, point.lat], local) },
        };
      });
      const source = map.getSource('routes') as mapboxgl.GeoJSONSource | undefined;
      source?.setData({ type: 'FeatureCollection', features });
      if (t < 1) rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);

    const activePoi = activePoiId ? category.points.find((p) => p.id === activePoiId) : null;
    if (activePoi) {
      map.flyTo({
        center: [activePoi.lng, activePoi.lat],
        zoom: 17,
        pitch: 60,
        bearing: bearingBetween(PROJECT_COORDINATES, { lat: activePoi.lat, lng: activePoi.lng }),
        duration: 2200,
        essential: true,
        easing: architecturalEase,
      });
    } else {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend(SITE);
      category.points.forEach((p) => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, {
        padding: getBoundsPadding(containerRef.current?.clientWidth ?? window.innerWidth),
        pitch: 55,
        bearing: -20,
        duration: 2200,
        essential: true,
        easing: architecturalEase,
        maxZoom: 16.5,
      });
    }
  }, [activeCategory, activePoiId, mapReady, setActivePoi]);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-surface">
        <p className="max-w-sm text-center text-sm text-ink-muted">
          Missing Mapbox access token. Set <code className="text-ink">VITE_MAPBOX_ACCESS_TOKEN</code> in{' '}
          <code className="text-ink">.env</code> to load the location experience.
        </p>
      </div>
    );
  }

  return <div ref={containerRef} className="h-full w-full" />;
}
