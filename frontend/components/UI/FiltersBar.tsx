import React from 'react';
import { Category } from '@/lib/types';
import clsx from 'clsx';

interface FiltersBarProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export default function FiltersBar({ categories, selectedCategory, onSelectCategory }: FiltersBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 noscrollbar">
      <button
        onClick={() => onSelectCategory(null)}
        className={clsx(
          "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
          selectedCategory === null
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(selectedCategory === cat.slug ? null : cat.slug)}
          className={clsx(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            selectedCategory === cat.slug
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
