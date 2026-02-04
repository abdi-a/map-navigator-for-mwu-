import React from 'react';
import { Building } from '@/lib/types';
import Image from 'next/image';

interface BuildingListProps {
  buildings: Building[];
  onSelect: (building: Building) => void;
  isLoading: boolean;
}

export default function BuildingList({ buildings, onSelect, isLoading }: BuildingListProps) {
  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">Loading...</div>;
  }

  if (buildings.length === 0) {
    return <div className="p-4 text-center text-gray-500">No buildings found.</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      <ul className="divide-y divide-gray-200">
        {buildings.map((building) => (
          <li
            key={building.id}
            onClick={() => onSelect(building)}
            className="p-4 hover:bg-gray-50 cursor-pointer flex gap-4 transition"
          >
            <div className="h-16 w-16 flex-shrink-0 relative rounded-md overflow-hidden bg-gray-200">
               {building.image_url ? (
                  <img src={building.image_url} alt={building.name} className="object-cover w-full h-full" />
               ) : (
                  <div className="flex items-center justify-center w-full h-full text-xs text-gray-400">No Img</div>
               )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{building.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{building.category?.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
