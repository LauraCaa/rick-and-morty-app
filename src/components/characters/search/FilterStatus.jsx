export default function FilterStatus({ resultsCount, filtersCount }) {
  return (
    <div className="flex items-center justify-between mx-8 py-3">
      <p className="text-md text-blue-600">{resultsCount} Results</p>
      {filtersCount > 0 && (
        <span className="bg-green-100 text-green-600 rounded-full px-3 py-1 text-sm font-semibold">
          {filtersCount} Filter
        </span>
      )}
    </div>
  );
}