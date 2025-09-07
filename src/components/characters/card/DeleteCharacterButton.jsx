import { useDeletedCharacters } from '../../../context/DeletedCharactersContext';
import { useNavigate } from 'react-router-dom';

export default function DeleteCharacter({ characterId }) {
  const { softDeleteCharacter } = useDeletedCharacters();
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this character?");
    if (confirmDelete) {
      softDeleteCharacter(characterId);
      navigate("/");
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
        </svg>
      </button>
    </div>
  );
}