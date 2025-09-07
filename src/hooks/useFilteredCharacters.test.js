import { renderHook } from '@testing-library/react';
import { useFilteredCharacters } from './useFilteredCharacters';

const mockCharacters = [
  { id: '1', name: 'Rick Sanchez', species: 'Human', gender: 'Male', status: 'Alive' },
  { id: '2', name: 'Morty Smith', species: 'Human', gender: 'Male', status: 'Alive' },
  { id: '3', name: 'Summer Smith', species: 'Human', gender: 'Female', status: 'Alive' },
  { id: '4', name: 'Mr. Meeseeks', species: 'Meeseeks', gender: 'Male', status: 'Dead' },
];

describe('useFilteredCharacters', () => {
  it('should filter characters by a specific species', () => {
    const { result } = renderHook(() =>
      useFilteredCharacters(mockCharacters, {
        isDeleted: () => false,
        searchTerm: '',
        filterOptions: { 
          characterStatus: 'All', 
          characterSpecies: 'Human', 
          characterGender: 'All',
          characterStatusFilter: 'All',
          sortDirection: 'A-Z' 
        },
        favorites: new Set(),
      })
    );
    expect(result.current.length).toBe(3);
    expect(result.current.every(c => c.species === 'Human')).toBe(true);
  });

  it('should sort characters by name in descending order (Z-A)', () => {
    const { result } = renderHook(() =>
      useFilteredCharacters(mockCharacters, {
        isDeleted: () => false,
        searchTerm: '',
        filterOptions: { 
          characterStatus: 'All', 
          characterSpecies: 'All',
          characterGender: 'All',
          characterStatusFilter: 'All',
          sortDirection: 'Z-A' 
        },
        favorites: new Set(),
      })
    );
    expect(result.current[0].name).toBe('Summer Smith');
  });

  it('should return an empty array when given an empty array of characters', () => {
    const { result } = renderHook(() =>
      useFilteredCharacters([], {
        isDeleted: () => false,
        searchTerm: '',
        filterOptions: { 
          characterStatus: 'All', 
          characterSpecies: 'All',
          characterGender: 'All',
          characterStatusFilter: 'All',
          sortDirection: 'A-Z' 
        },
        favorites: new Set(),
      })
    );
    expect(result.current).toEqual([]);
  });

  it('should return an empty array if no characters match the filter', () => {
    const { result } = renderHook(() =>
      useFilteredCharacters(mockCharacters, {
        isDeleted: () => false,
        searchTerm: 'NonExistentName',
        filterOptions: { 
          characterStatus: 'All', 
          characterSpecies: 'All',
          characterGender: 'All',
          characterStatusFilter: 'All',
          sortDirection: 'A-Z' 
        },
        favorites: new Set(),
      })
    );
    expect(result.current).toEqual([]);
  });

  it('should return an empty array and not crash if characters are undefined', () => {
    const { result } = renderHook(() =>
      useFilteredCharacters(undefined, {
        isDeleted: () => false,
        searchTerm: '',
        filterOptions: { 
          characterStatus: 'All', 
          characterSpecies: 'All',
          characterGender: 'All',
          characterStatusFilter: 'All',
          sortDirection: 'A-Z' 
        },
        favorites: new Set(),
      })
    );
    expect(result.current).toEqual([]);
  });
});
