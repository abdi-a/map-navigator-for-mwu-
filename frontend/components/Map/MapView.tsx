'use client';

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { Building, CampusBoundary } from '@/lib/types';
import L from 'leaflet';

interface MapViewProps {
  buildings: Building[];
  selectedBuilding: Building | null;
  onMarkerClick: (building: Building) => void;
  campusBoundary: CampusBoundary | null;
  routeGeoJSON: any | null; // GeoJSON line
}

// Helper to update map view
function MapController({ selectedBuilding, routeGeoJSON, campusBoundary }: { selectedBuilding: Building | null, routeGeoJSON: any, campusBoundary: CampusBoundary | null }) {
  const map = useMap();

  useEffect(() => {
    if (campusBoundary && campusBoundary.geometry) {
        // Apply Campus Lock
        const g = campusBoundary.geometry;
        if (g.southWest && g.northEast) {
            const bounds = L.latLngBounds(
                [g.southWest.lat, g.southWest.lng],
                [g.northEast.lat, g.northEast.lng]
            );
            map.setMaxBounds(bounds);
            map.setMinZoom(15); // Adjust as seen fit
            map.fitBounds(bounds);
        }
    }
  }, [campusBoundary, map]);

  useEffect(() => {
    if (selectedBuilding) {
      map.flyTo([selectedBuilding.latitude, selectedBuilding.longitude], 18, {
        animate: true,
      });
    }
  }, [selectedBuilding, map]);

  useEffect(() => {
    if (routeGeoJSON) {
      const layer = L.geoJSON(routeGeoJSON);
      map.fitBounds(layer.getBounds(), { padding: [50, 50] });
    }
  }, [routeGeoJSON, map]);

  return null;
}

export default function MapView({ buildings, selectedBuilding, onMarkerClick, campusBoundary, routeGeoJSON }: MapViewProps) {
  
  // Default center (MWU Robe approx)
  const defaultCenter: [number, number] = [7.125000, 40.000000];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={16}
      style={{ height: '100%', width: '100%' }}
      maxZoom={19}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <MapController selectedBuilding={selectedBuilding} routeGeoJSON={routeGeoJSON} campusBoundary={campusBoundary} />

      {/* Buildings Markers */}
      {buildings.map((building) => (
        <Marker
          key={building.id}
          position={[building.latitude, building.longitude]}
          eventHandlers={{
            click: () => onMarkerClick(building),
          }}
        >
          <Popup>{building.name}</Popup>
        </Marker>
      ))}

      {/* Route Line */}
      {routeGeoJSON && (
         <Polyline 
            positions={routeGeoJSON.coordinates.map((c: number[]) => [c[1], c[0]])} // GeoJSON is usually lng,lat - Leaflet wants lat,lng
            color="blue" 
            weight={5} 
         />
      )}
      
      {/* Boundary Visual (Optional) */}
      {/* Use standard Polygon if coordinates available */}
    </MapContainer>
  );
}
