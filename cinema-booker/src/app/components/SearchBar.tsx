import React from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      className="mt-2 border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-black"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}