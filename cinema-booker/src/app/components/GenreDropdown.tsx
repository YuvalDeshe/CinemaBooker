'use client';

import React, { useRef, useEffect } from "react";

// add more genres later if needed or pull from the api if it has them?
const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

type GenreDropdownProps = {
  selected: string[];
  setSelected: (genres: string[]) => void;
};

export default function GenreDropdown({ selected, setSelected }: GenreDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleGenre = (genre: string) => {
    setSelected(
      selected.includes(genre)
        ? selected.filter((g) => g !== genre)
        : [...selected, genre]
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Sort selected genres by their order in GENRES
  const sortedSelected = GENRES.filter((g) => selected.includes(g));

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-64">
      <button
        className="border rounded px-4 py-2 w-full text-left bg-white text-black"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        {sortedSelected.length > 0
          ? sortedSelected.join(", ")
          : "Filter by genre"}
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white border rounded shadow-lg">
          {GENRES.map((genre) => (
            <label
              key={genre}
              className="flex items-center text-black px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={selected.includes(genre)}
                onChange={() => toggleGenre(genre)}
                className="mr-2"
              />
              {genre}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}