'use client';

import React from "react";

type MovieProps = {
  _id: string;
  title: string;
  genre: string[];
  posterUrl?: string;
  isCurrentlyRunning: boolean;
};

export default function Movie({ _id, title, genre, posterUrl, isCurrentlyRunning }: MovieProps) {

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
      <div className="text-xs text-white text-center">{genre}</div>
      <div className="flex flex-col gap-2 w-full mt-4 mb-4">
        <a
          href={`/movie/${_id}`}
          className="w-full"
        >
          <button
            className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
            type="button"
          >
            Movie Details
          </button>
        </a>
      </div>
    </div>
  );
}
