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

jest.mock('./FavoriteCharacterList', () => () => <div data-testid="fav-list" />);
jest.mock('./OtherCharacterList', () => () => <div data-testid="other-list" />);

describe('CharacterView', () => {
  test('should show a loading message when data is being fetched', () => {
    useGetCharacters.mockReturnValue({ loading: true, error: null, characters: [] });
    
    render(<MemoryRouter><CharacterView /></MemoryRouter>);
    
    expect(screen.getByText('Loading characters...')).toBeInTheDocument();
  });

  beforeEach(() => {
    useGetCharacters.mockReturnValue({ loading: false, error: null, characters: [] });
    useFilteredCharacters.mockReturnValue([]);
    useFavorites.mockReturnValue({ favorites: new Set() });
    useDeletedCharacters.mockReturnValue({ isDeleted: () => false });
  });

test('should show an error message when the API fails', () => {
  useGetCharacters.mockReturnValue({ loading: false, error: { message: 'Network Error' }, characters: [] });
  render(<MemoryRouter><CharacterView /></MemoryRouter>);
});

test('should render character lists when data is available', () => {
  useGetCharacters.mockReturnValue({ loading: false, error: null, characters: [{ id: 1 }] });
  useFilteredCharacters.mockReturnValue([{ id: 1 }]);
  useFavorites.mockReturnValue({ favorites: new Set([1]) });
  useDeletedCharacters.mockReturnValue({ isDeleted: () => false });

  render(<MemoryRouter><CharacterView /></MemoryRouter>);
  
  expect(screen.getByTestId('fav-list')).toBeInTheDocument();
  expect(screen.getByTestId('other-list')).toBeInTheDocument();
  });
});