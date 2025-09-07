export default function CommentList({ comments, onDeleteComment }) {
  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (confirmDelete) {
      onDeleteComment(index);
    }
  };

  return (
    <ul className="space-y-3 mt-4">
      {comments.map((comment, index) => (
        <li
          key={index}
          className="flex justify-between items-center bg-gray-50 border rounded-lg px-3 py-2"
        >
          <span className="text-gray-700">{comment}</span>
          <button
            onClick={() => handleDelete(index)}
            className="text-primary-600 hover:bg-primary-100 p-1 rounded-lg p-1"
            aria-label="Delete comment"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
