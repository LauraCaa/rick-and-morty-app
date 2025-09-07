import { gql, useQuery } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      species
      status
      image
      gender
    }
  }
`;

export const useGetCharacters = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  return { loading, error, characters: data?.characters?.results || [] };
};

export const useGetCharacter = (id) => {
  const { loading, error, data } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
  });
  return { loading, error, character: data?.character };
};