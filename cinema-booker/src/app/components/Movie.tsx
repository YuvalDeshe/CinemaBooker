import react from "react";

type MovieProps = {
  title: string;
  genre: string[];
  posterUrl?: string;
};

export default function Movie({ title, genre, posterUrl }: MovieProps) {
  return (
    <div className="border rounded shadow p-4 bg-gray-600 flex flex-col items-center w-48">
      <div className="w-32 h-48 bg-gray-200 flex items-center justify-center mb-2">
        {posterUrl ? (
          <img src={posterUrl} alt={title} className="w-full h-full object-cover rounded" />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>
      <h3 className="font-semibold text-lg mb-1 text-center">{title}</h3>
      <div className="text-xs text-white text-center">{genre.join(", ")}</div>
    </div>
  );
}