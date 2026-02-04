'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getCategories, getBuildings, getCampusBoundary, getRoute } from '@/lib/api';
import { Category, Building, CampusBoundary } from '@/lib/types';
import FiltersBar from '@/components/UI/FiltersBar';
import SearchBox from '@/components/UI/SearchBox';
import BuildingList from '@/components/UI/BuildingList';
import BuildingDetails from '@/components/UI/BuildingDetails';
import clsx from 'clsx';
import { Menu, ChevronLeft } from 'lucide-react';

// Dynamic import for Leaflet map (SSO false)
const MapView = dynamic(() => import('@/components/Map/MapView'), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center bg-gray-100">Loading Map...</div>
});

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [campusBoundary, setCampusBoundary] = useState<CampusBoundary | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [routeGeoJSON, setRouteGeoJSON] = useState<any | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Initial Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, bound] = await Promise.all([getCategories(), getCampusBoundary()]);
        setCategories(cats);
        setCampusBoundary(bound);
      } catch (e) {
        console.error("Failed to load init data", e);
      }
    };
    fetchData();
  }, []);

  // Fetch Buildings when filters change
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const data = await getBuildings(selectedCategory || undefined, searchQuery);
        setBuildings(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBuildings();
  }, [selectedCategory, searchQuery]);

  const handleNavigate = async () => {
    if (!selectedBuilding) return;
    
    setIsNavigating(true);
    
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setIsNavigating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // In real OSRM, we need start and end points
          const response = await getRoute(
             [latitude, longitude], 
             [selectedBuilding.latitude, selectedBuilding.longitude]
          );

          if (response.routes && response.routes.length > 0) {
              setRouteGeoJSON(response.routes[0].geometry);
          } else {
              alert("No route found");
          }
        } catch (error) {
          console.error("Route error", error);
          alert("Failed to calculate route");
        } finally {
          setIsNavigating(false);
        }
      },
      (error) => {
        console.error("Geo error", error);
        alert("Unable to retrieve your location");
        setIsNavigating(false);
      }
    );
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <div 
        className={clsx(
            "fixed inset-y-0 left-0 index-20 z-20 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col sm:relative",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0 sm:w-80"
        )}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-900">MWU Navigator</h1>
            <button className="sm:hidden" onClick={() => setIsSidebarOpen(false)}>
                <ChevronLeft />
            </button>
        </div>
        
        <div className="p-4 flex flex-col h-full overflow-hidden">
            <SearchBox onSearch={setSearchQuery} />
            <FiltersBar 
                categories={categories} 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory} 
            />
            <div className="mt-4 flex-1 overflow-hidden flex flex-col">
                <BuildingList 
                    buildings={buildings} 
                    onSelect={(b) => {
                        setSelectedBuilding(b);
                        if (window.innerWidth < 640) setIsSidebarOpen(false);
                    }}
                    isLoading={false}
                />
            </div>
        </div>
      </div>

      {/* Main Content (Map) */}
      <div className="flex-1 relative h-full">
        {/* Mobile Toggle */}
        {!isSidebarOpen && (
             <button 
                onClick={() => setIsSidebarOpen(true)}
                className="absolute top-4 left-4 z-10 bg-white p-2 rounded-md shadow-md sm:hidden"
             >
                <Menu />
             </button>
        )}

        <MapView 
            buildings={buildings}
            selectedBuilding={selectedBuilding}
            onMarkerClick={setSelectedBuilding}
            campusBoundary={campusBoundary}
            routeGeoJSON={routeGeoJSON}
        />
        
        <BuildingDetails 
            building={selectedBuilding} 
            onClose={() => setSelectedBuilding(null)}
            onNavigate={handleNavigate}
            isNavigating={isNavigating}
        />
      </div>
    </div>
  );
}
