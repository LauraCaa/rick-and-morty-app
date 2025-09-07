import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OtherCharacterList from './OtherCharacterList';
import  FavoritesProvider  from '../../../context/FavoritesContext'; 

describe('OtherCharacterList', () => {

  const mockCharacters = [
    { id: '1', name: 'Rick Sanchez', image: 'url/rick.png' },
    { id: '2', name: 'Morty Smith', image: 'url/morty.png' },
  ];

  it('should render the list of characters when data is provided', () => {
    render(
      <FavoritesProvider>
        <MemoryRouter>
          <OtherCharacterList characters={mockCharacters} />
        </MemoryRouter>
      </FavoritesProvider>
    );

    expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/morty smith/i)).toBeInTheDocument();
  });

  it('should render the "not found" message when the list is empty', () => {
    render(
      <FavoritesProvider>
        <MemoryRouter>
          <OtherCharacterList characters={[]} />
        </MemoryRouter>
      </FavoritesProvider>
    );

    expect(screen.getByText(/no other characters found/i)).toBeInTheDocument();
  });

  it('should render the "not found" message if characters prop is not provided', () => {
    render(
      <FavoritesProvider>
        <MemoryRouter>
          <OtherCharacterList />
        </MemoryRouter>
      </FavoritesProvider>
    );

    expect(screen.getByText(/no other characters found/i)).toBeInTheDocument();
  });
});