import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterView from './CharacterView';

jest.mock('../../../services/charactersApi');
import { useGetCharacters } from '../../../services/charactersApi';

jest.mock('../../../hooks/useFilteredCharacters');
import { useFilteredCharacters } from '../../../hooks/useFilteredCharacters';

jest.mock('../../../context/FavoritesContext');
import { useFavorites } from '../../../context/FavoritesContext';

jest.mock('../../../context/DeletedCharactersContext');
import { useDeletedCharacters } from '../../../context/DeletedCharactersContext';

jest.mock('./FavoriteCharacterList', () => ({ characters }) => (
  <div data-testid="fav-list">{characters.length}</div>
));
jest.mock('./OtherCharacterList', () => ({ characters }) => (
  <div data-testid="other-list">{characters.length}</div>
));

describe('CharacterView', () => {
  beforeEach(() => {
    useFavorites.mockReturnValue({ favorites: new Set() });
    useDeletedCharacters.mockReturnValue({ isDeleted: () => false });
  });

  test('should show a loading message when data is being fetched', () => {
    useGetCharacters.mockReturnValue({ loading: true, error: null, characters: [] });
    useFilteredCharacters.mockReturnValue([]);
    
    render(<MemoryRouter><CharacterView filterOptions={{ characterStatus: 'All' }} /></MemoryRouter>);
    
    expect(screen.getByText('Loading characters...')).toBeInTheDocument();
  });

  test('should show an error message when the API fails', () => {
    useGetCharacters.mockReturnValue({ loading: false, error: { message: 'Network Error' }, characters: [] });
    useFilteredCharacters.mockReturnValue([]);

    render(<MemoryRouter><CharacterView filterOptions={{ characterStatus: 'All' }} /></MemoryRouter>);

    expect(screen.getByText('Error: Network Error')).toBeInTheDocument();
  });

  test('should render character lists when data is available', () => {
    const mockCharacters = [{ id: '1', name: 'Rick' }, { id: '2', name: 'Morty' }];
    useGetCharacters.mockReturnValue({ loading: false, error: null, characters: mockCharacters });
    useFilteredCharacters.mockReturnValue(mockCharacters);
    useFavorites.mockReturnValue({ favorites: new Set(['1']) });

    const mockProps = {
      searchTerm: '',
      filterOptions: { characterStatus: 'All', characterSpecies: 'All', characterGender: 'All', sortDirection: 'A-Z' },
    };

    render(<MemoryRouter><CharacterView {...mockProps} /></MemoryRouter>);
    
    expect(screen.getByTestId('fav-list')).toBeInTheDocument();
    expect(screen.getByTestId('other-list')).toBeInTheDocument();
  });
});