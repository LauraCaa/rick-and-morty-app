import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function CommentsSection() {
  const [comments, setComments] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("comments");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const addComment = (text) => {
    setComments([...comments, text]);
  };

  const deleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold mb-4">Comments</h2>
      <CommentList comments={comments} onDeleteComment={deleteComment} />
      <CommentForm onAddComment={addComment} />
    </div>
  );
}
