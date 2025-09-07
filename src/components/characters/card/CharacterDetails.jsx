export default function CharacterDetails({ character = {} }) {
  const details = [
    { label: "Specie", value: character.species || "Unknown" },
    { label: "Status", value: character.status || "Unknown" },
    { label: "Gender", value: character.gender || "Unknown" },
  ];

  return (
    <ul>
      {details.map((detail, index) => (
        <li key={index} className="pb-4 mb-4 border-b border-gray-200 last:border-b-0">
          <h3 className="text-sm">{detail.label}</h3>
          <p className="text-gray-400">{detail.value}</p>
        </li>
      ))}
    </ul>
  );
};
