'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { FiSearch, FiX } from 'react-icons/fi';

export default function Search({
  onSearch,
  type,
  grade,
}: {
  onSearch: (results: any[]) => void;
  type?: string;
  grade?: string;
}) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch();
    } else {
      onSearch([]);
    }
  }, [debouncedQuery]);

  const performSearch = async () => {
    try {
      const params = new URLSearchParams({
        q: debouncedQuery,
        ...(type && { type }),
        ...(grade && { grade }),
      });

      const res = await fetch(`/api/search?${params}`);
      const data = await res.json();
      onSearch(data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FiX />
          </button>
        )}
      </div>
    </div>
  );
} 