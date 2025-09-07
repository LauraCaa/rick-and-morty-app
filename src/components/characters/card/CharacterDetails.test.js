import { render, screen } from '@testing-library/react';
import CharacterDetails from './CharacterDetails';

describe('CharacterDetails', () => {

  test('should render character details correctly when all data is provided', () => {
    const mockCharacter = {
      species: 'Human',
      status: 'Alive',
      gender: 'Male',
    };

    render(<CharacterDetails character={mockCharacter} />);

    expect(screen.getByText('Specie')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  test('should render "Unknown" for missing details', () => {
    const mockCharacter = {
      species: 'Alien',
      status: 'unknown',
      gender: null,
    };

    render(<CharacterDetails character={mockCharacter} />);

    expect(screen.getByText('Specie')).toBeInTheDocument();
    expect(screen.getByText('Alien')).toBeInTheDocument();

    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument();

    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  test('should render "Unknown" for all details when character is an empty object', () => {
    render(<CharacterDetails character={{}} />);
    expect(screen.getAllByText('Unknown')).toHaveLength(3);
  });
  
  test('should render "Unknown" for all details when character is undefined', () => {
    render(<CharacterDetails character={undefined} />);
    expect(screen.getAllByText('Unknown')).toHaveLength(3);
  });
});