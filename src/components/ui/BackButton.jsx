import { useNavigate } from "react-router-dom";

export default function BackButton () {
  const navigate = useNavigate();

  return (
    <button className="md:hidden mb-10" onClick={() => navigate("/")}>
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L1 8M1 8L8 1M1 8L19 8" stroke="#8054C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

