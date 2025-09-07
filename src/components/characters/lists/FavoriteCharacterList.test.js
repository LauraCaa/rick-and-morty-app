import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FavoriteCharacterList from "./FavoriteCharacterList";

jest.mock("./CharacterItem", () => ({ character }) => (
  <div data-testid={`character-item-${character.id}`}>{character.name}</div>
));

describe("FavoriteCharacterList", () => {
  test("renders nothing when characters list is empty", () => {
    const { container } = render(
      <MemoryRouter>
        <FavoriteCharacterList characters={[]} />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  test("shows heading with the correct number of favorites", () => {
    const characters = [{ id: 1, name: "Rick" }, { id: 2, name: "Morty" }];
    render(
      <MemoryRouter>
        <FavoriteCharacterList characters={characters} />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/FAVORITE CHARACTERS \(2\)/i)
    ).toBeInTheDocument();
  });

  test("renders favorite characters", () => {
    const characters = [{ id: 1, name: "Rick" }, { id: 2, name: "Morty" }];
    render(
      <MemoryRouter>
        <FavoriteCharacterList characters={characters} />
      </MemoryRouter>
    );
    expect(screen.getAllByTestId(/character-item-/)).toHaveLength(2);
  });

  test("links point to the correct route", () => {
    const characters = [{ id: 1, name: "Rick" }];
    render(
      <MemoryRouter>
        <FavoriteCharacterList characters={characters} />
      </MemoryRouter>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/character/1");
  });
});
