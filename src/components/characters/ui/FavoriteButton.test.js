import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteButton from './FavoriteButton';

describe('FavoriteButton', () => {
  it('should render the filled icon when isFavorite is true', () => {
    render(<FavoriteButton isFavorite={true} />);
    
    expect(screen.getByTestId('icon-filled')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-outline')).not.toBeInTheDocument();
  });

  it('should render the outline icon when isFavorite is false', () => {
    render(<FavoriteButton isFavorite={false} />);

    expect(screen.getByTestId('icon-outline')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-filled')).not.toBeInTheDocument();
  });

  it('should call the onClick handler when clicked', () => {
    const handleClickMock = jest.fn();
    
    render(<FavoriteButton isFavorite={false} onClick={handleClickMock} />);
    
    const buttonElement = screen.getByLabelText('Add to favorites');
    fireEvent.click(buttonElement);
    
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });
});