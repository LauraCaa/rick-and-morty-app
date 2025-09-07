import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import { useGetCharacter } from '../../../services/charactersApi';
import  FavoritesProvider from '../../../context/FavoritesContext';
import  DeletedCharactersProvider from '../../../context/DeletedCharactersContext';


jest.mock('../../../services/charactersApi');

const mockedUseGetCharacter = useGetCharacter;

describe('CharacterCard', () => {
  beforeEach(() => {
    mockedUseGetCharacter.mockClear();
  });

  it('should render a loading message while fetching data', () => {
    mockedUseGetCharacter.mockReturnValue({
      loading: true,
      error: null,
      character: null,
    });

    render(
      <DeletedCharactersProvider>
        <FavoritesProvider>
          <MemoryRouter initialEntries={['/character/1']}>
            <Routes>
              <Route path="/character/:id" element={<CharacterCard />} />
            </Routes>
          </MemoryRouter>
        </FavoritesProvider>
      </DeletedCharactersProvider>
    );

    expect(screen.getByText(/loading character/i)).toBeInTheDocument();
  });

  it('should render an error message if fetching fails', () => {
    mockedUseGetCharacter.mockReturnValue({
      loading: false,
      error: new Error('Character not found'),
      character: null,
    });

    render(
        <DeletedCharactersProvider>
          <FavoritesProvider>
            <MemoryRouter initialEntries={['/character/1']}>
              <Routes>
                <Route path="/character/:id" element={<CharacterCard />} />
              </Routes>
            </MemoryRouter>
          </FavoritesProvider>
        </DeletedCharactersProvider>
      );
  
      expect(screen.getByText(/error: character not found/i)).toBeInTheDocument();
  });

  it('should render the character details when data is fetched successfully', () => {
    const mockCharacter = {
        id: '1',
        name: 'Rick Sanchez',
        species: 'Human',
        status: 'Alive',
        gender: 'Male',
        image: 'url/rick.png'
    };
    
    mockedUseGetCharacter.mockReturnValue({
        loading: false,
        error: null,
        character: mockCharacter,
    });

    render(
        <DeletedCharactersProvider>
          <FavoritesProvider>
            <MemoryRouter initialEntries={['/character/1']}>
              <Routes>
                <Route path="/character/:id" element={<CharacterCard />} />
              </Routes>
            </MemoryRouter>
          </FavoritesProvider>
        </DeletedCharactersProvider>
      );

      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Human')).toBeInTheDocument();
      expect(screen.getByText('Alive')).toBeInTheDocument();
  });
});