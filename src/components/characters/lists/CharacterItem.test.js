import { render, screen, fireEvent } from '@testing-library/react';
import CharacterItem from './CharacterItem';
import { useFavorites } from '../../../context/FavoritesContext';

jest.mock('../../../context/FavoritesContext');

describe('CharacterItem', () => {
  const mockCharacter = {
    id: '1',
    name: 'Rick Sanchez',
    species: 'Human',
    image: 'rick.jpg',
  };
  
  const mockIsFavorite = jest.fn();
  const mockToggleFavorite = jest.fn();

  beforeEach(() => {
    useFavorites.mockReturnValue({
      isFavorite: mockIsFavorite,
      toggleFavorite: mockToggleFavorite,
    });
    jest.clearAllMocks();
  });

  test('should render character details', () => {
    mockIsFavorite.mockReturnValue(false); 
    
    render(<CharacterItem character={mockCharacter} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute('src', 'rick.jpg');
  });

  test('should show the character as a favorite', () => {
    mockIsFavorite.mockReturnValue(true);

    render(<CharacterItem character={mockCharacter} />);
    
    const favoriteButton = screen.getByTestId('favorite-button');
    expect(favoriteButton).toHaveAttribute('data-is-favorite', 'true');
  });

  test('should show the character as not a favorite', () => {
    mockIsFavorite.mockReturnValue(false);

    render(<CharacterItem character={mockCharacter} />);
    
    const favoriteButton = screen.getByTestId('favorite-button');
    expect(favoriteButton).toHaveAttribute('data-is-favorite', 'false');
  });

  test('should call toggleFavorite when the favorite button is clicked', () => {
    mockIsFavorite.mockReturnValue(false);
    
    render(<CharacterItem character={mockCharacter} />);
    
    const favoriteButtonWrapper = screen.getByTestId('favorite-button-wrapper');
    fireEvent.click(favoriteButtonWrapper);

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavorite).toHaveBeenCalledWith('1');
  });
});

jest.mock('../ui/FavoriteButton', () => {
  return function MockFavoriteButton({ isFavorite }) {
    return <div data-testid="favorite-button" data-is-favorite={isFavorite.toString()} />;
  };
});