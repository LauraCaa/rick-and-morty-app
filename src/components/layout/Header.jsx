export default function Header({ isMobile = false }) {
  return (
    <div className={isMobile ? "bg-white p-4" : " px-5"}>
      <h1 className="pt-3 text-2xl font-bold text-gray-800"> Rick and Morty List</h1>
    </div>
  );
}
