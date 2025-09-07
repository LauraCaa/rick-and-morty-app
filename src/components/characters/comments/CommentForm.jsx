import { useState } from "react";

export default function CommentForm({ onAddComment }) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onAddComment(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4 items-center">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 rounded-lg px-4 py-3 bg-gray-100 placeholder-gray-500 outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white transition"
      />
      <button
        type="submit"
        disabled={!comment.trim()}
        className={`px-4 py-3 rounded-lg text-white font-semibold transition ${
          comment.trim()
            ? 'bg-primary-600 text-white hover:bg-purple-700'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Send
      </button>
    </form>
  );
}