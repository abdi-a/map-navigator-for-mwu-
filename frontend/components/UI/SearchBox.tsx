import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '@/lib/useDebounce'; // We need this hook

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [value, setValue] = useState('');
  
  // Simple custom debounce effect inside or just use standard timeout
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [value, onSearch]);

  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:ring focus:ring-blue-200 sm:text-sm"
        placeholder="Search buildings..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
