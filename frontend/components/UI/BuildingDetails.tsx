import React from 'react';
import { Building } from '@/lib/types';
import { Navigation, X } from 'lucide-react';

interface BuildingDetailsProps {
  building: Building | null;
  onClose: () => void;
  onNavigate: () => void;
  isNavigating: boolean;
}

export default function BuildingDetails({ building, onClose, onNavigate, isNavigating }: BuildingDetailsProps) {
  if (!building) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 sm:top-20 sm:left-auto sm:right-4 sm:bottom-auto sm:w-96 bg-white shadow-xl rounded-t-xl sm:rounded-xl z-[1000] p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-gray-900">{building.name}</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden mb-4 relative">
         {building.image_url && (
            <img src={building.image_url} alt={building.name} className="w-full h-full object-cover" />
         )}
      </div>

      <p className="text-gray-600 text-sm mb-4">
        {building.description || "No description available."}
      </p>

      <button 
        onClick={onNavigate}
        disabled={isNavigating}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:bg-blue-400"
      >
        <Navigation className="h-5 w-5" />
        {isNavigating ? 'Calculating Route...' : 'Navigate Here'}
      </button>
    </div>
  );
}
