(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/CinemaBooker/cinema-booker/src/app/components/SearchBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function SearchBar(param) {
    let { value, onChange } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: "text",
        placeholder: "Search movies...",
        className: "mt-2 border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-black",
        value: value,
        onChange: (e)=>onChange(e.target.value)
    }, void 0, false, {
        fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/SearchBar.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = SearchBar;
var _c;
__turbopack_context__.k.register(_c, "SearchBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/CinemaBooker/cinema-booker/src/app/components/GenreDropdown.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GenreDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
// add more genres later if needed or pull from the api if it has them?
const GENRES = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller"
];
function GenreDropdown(param) {
    let { selected, setSelected } = param;
    _s();
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const toggleGenre = (genre)=>{
        setSelected(selected.includes(genre) ? selected.filter((g)=>g !== genre) : [
            ...selected,
            genre
        ]);
    };
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GenreDropdown.useEffect": ()=>{
            function handleClickOutside(event) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setOpen(false);
                }
            }
            if (open) {
                document.addEventListener("mousedown", handleClickOutside);
            } else {
                document.removeEventListener("mousedown", handleClickOutside);
            }
            return ({
                "GenreDropdown.useEffect": ()=>{
                    document.removeEventListener("mousedown", handleClickOutside);
                }
            })["GenreDropdown.useEffect"];
        }
    }["GenreDropdown.useEffect"], [
        open
    ]);
    // Sort selected genres by their order in GENRES
    const sortedSelected = GENRES.filter((g)=>selected.includes(g));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: dropdownRef,
        className: "relative w-full sm:w-64",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "mt-2 border rounded px-4 py-2 w-full text-center bg-blue-700 text-white hover:bg-blue-800 transition",
                onClick: ()=>setOpen((o)=>!o),
                type: "button",
                children: sortedSelected.length > 0 ? sortedSelected.join(", ") : "Filter by genre"
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/GenreDropdown.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-10 mt-2 w-full bg-white border rounded shadow-lg",
                children: GENRES.map((genre)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center text-black px-4 py-2 cursor-pointer hover:bg-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: selected.includes(genre),
                                onChange: ()=>toggleGenre(genre),
                                className: "mr-2"
                            }, void 0, false, {
                                fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/GenreDropdown.tsx",
                                lineNumber: 75,
                                columnNumber: 15
                            }, this),
                            genre
                        ]
                    }, genre, true, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/GenreDropdown.tsx",
                        lineNumber: 71,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/GenreDropdown.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/GenreDropdown.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(GenreDropdown, "6QGvlA8yoVm3ercldYN7fVS4nbM=");
_c = GenreDropdown;
var _c;
__turbopack_context__.k.register(_c, "GenreDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/CinemaBooker/cinema-booker/src/app/components/movie.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "showTimeButtons": "movie-module__8CLdUq__showTimeButtons",
});
}),
"[project]/CinemaBooker/cinema-booker/src/app/components/Movie.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Movie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$movie$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/src/app/components/movie.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// if we ever have to have individual showtimes per movie, replace this with data from MongoDB
const SHOWTIMES = [
    "9:00 a.m.",
    "12:00 p.m.",
    "3:00 p.m.",
    "6:00 p.m.",
    "9:00 p.m."
];
function Movie(param) {
    let { _id, title, genre, posterUrl, isCurrentlyRunning } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border rounded shadow p-4 bg-gray-600 flex flex-col items-center w-48",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-32 h-48 bg-gray-200 flex items-center justify-center mb-2",
                children: posterUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: posterUrl,
                    alt: title,
                    className: "w-full h-full object-cover rounded"
                }, void 0, false, {
                    fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/Movie.tsx",
                    lineNumber: 25,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-500",
                    children: "No Image"
                }, void 0, false, {
                    fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/Movie.tsx",
                    lineNumber: 27,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/Movie.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-semibold text-lg mb-1 text-center",
                children: title
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/Movie.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-white text-center",
                children: genre
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/Movie.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2 w-full mt-4 mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "/movie/".concat(_id),
                    className: "w-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition",
                        type: "button",
                        children: "Movie Details"
                    }, void 0, false, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/Movie.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/Movie.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/Movie.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            isCurrentlyRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-cs text-white text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "Showtimes:"
                    }, void 0, false, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/Movie.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    SHOWTIMES.map((value, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$movie$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].showTimeButtons,
                            onClick: ()=>router.push("/movie/".concat(_id, "?time=").concat(encodeURIComponent(value))),
                            children: value
                        }, "".concat(title, " ").concat(index), false, {
                            fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/Movie.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/Movie.tsx",
                lineNumber: 45,
                columnNumber: 31
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/Movie.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(Movie, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Movie;
var _c;
__turbopack_context__.k.register(_c, "Movie");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/CinemaBooker/cinema-booker/src/app/components/MovieList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MovieList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$Movie$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/src/app/components/Movie.tsx [app-client] (ecmascript)");
;
;
function MovieList(param) {
    let { movies } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full flex flex-wrap gap-8 justify-center mt-8",
        children: movies.map((movie)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$Movie$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: movie.title,
                genre: movie.genre,
                _id: movie._id,
                posterUrl: movie.posterUrl,
                isCurrentlyRunning: movie.isCurrentlyRunning
            }, movie._id, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/MovieList.tsx",
                lineNumber: 20,
                columnNumber: 30
            }, this))
    }, void 0, false, {
        fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/MovieList.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
} // (
 //         <div
 //           className="movie-card flex flex-col items-center bg-gray-800 rounded-lg shadow-lg p-4 w-64"
 //           key={movie._id}
 //         >
 //           <img
 //             src={movie.posterUrl}
 //             alt={movie.title}
 //             className="mb-2 w-40 h-60 object-cover rounded"
 //           />
 //           <h3 className="text-lg font-bold text-white">{movie.title}</h3>
 //           <p className="text-gray-300 text-sm mb-2">
 //             {movie.genre.join(", ")}
 //           </p>
 //           <div className="flex flex-col gap-2 w-full mt-4">
 //             <a
 //               href={`/movie/${movie._id}`}
 //               className="w-full"
 //             >
 //               <button
 //                 className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
 //                 type="button"
 //               >
 //                 Movie Details
 //               </button>
 //             </a>
 //           </div>
 //         </div>
 //       )
_c = MovieList;
var _c;
__turbopack_context__.k.register(_c, "MovieList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/CinemaBooker/cinema-booker/src/app/components/EmailVerificationBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmailVerificationBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function EmailVerificationBanner(param) {
    let { userEmail, onResendEmail, isResending = false } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "h-5 w-5 text-yellow-400",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/EmailVerificationBanner.tsx",
                            lineNumber: 19,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/EmailVerificationBanner.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/EmailVerificationBanner.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ml-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm font-medium text-yellow-800",
                            children: "Email Verification Required"
                        }, void 0, false, {
                            fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/EmailVerificationBanner.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 text-sm text-yellow-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Please verify your email address to access all features. We sent a verification link to",
                                        ' ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: userEmail || 'your email'
                                        }, void 0, false, {
                                            fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/EmailVerificationBanner.tsx",
                                            lineNumber: 29,
                                            columnNumber: 15
                                        }, this),
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/EmailVerificationBanner.tsx",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1",
                                    children: [
                                        "Check your inbox and spam folder. Didn't receive the email?",
                                        ' ',
                                        onResendEmail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onResendEmail,
                                            disabled: isResending,
                                            className: "font-medium text-yellow-800 hover:text-yellow-600 underline disabled:opacity-50",
                                            children: isResending ? 'Sending...' : 'Resend verification email'
                                        }, void 0, false, {
                                            fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/EmailVerificationBanner.tsx",
                                            lineNumber: 34,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/EmailVerificationBanner.tsx",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/EmailVerificationBanner.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/EmailVerificationBanner.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/EmailVerificationBanner.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/CinemaBooker/cinema-booker/src/app/components/EmailVerificationBanner.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = EmailVerificationBanner;
var _c;
__turbopack_context__.k.register(_c, "EmailVerificationBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/CinemaBooker/cinema-booker/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$SearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/src/app/components/SearchBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$GenreDropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/src/app/components/GenreDropdown.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$MovieList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/src/app/components/MovieList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$EmailVerificationBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/src/app/components/EmailVerificationBanner.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function HomeContent() {
    var _session_user, _session_user1;
    _s();
    const { data: session, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedGenres, setSelectedGenres] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [movies, setMovies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isResendingEmail, setIsResendingEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const showVerificationRequired = searchParams.get('verification-required') === 'true';
    const isAuthenticated = status === 'authenticated';
    var _session_user_isEmailVerified;
    const isEmailVerified = (_session_user_isEmailVerified = session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.isEmailVerified) !== null && _session_user_isEmailVerified !== void 0 ? _session_user_isEmailVerified : false;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeContent.useEffect": ()=>{
            const fetchMovies = {
                "HomeContent.useEffect.fetchMovies": async ()=>{
                    try {
                        const response = await fetch("/api/movies");
                        if (!response.ok) {
                            throw new Error("Failed to fetch movies.");
                        }
                        const data = await response.json();
                        setMovies(data);
                    } catch (err) {
                        console.error(err);
                    }
                }
            }["HomeContent.useEffect.fetchMovies"];
            fetchMovies();
        }
    }["HomeContent.useEffect"], []);
    const handleResendVerificationEmail = async ()=>{
        var _session_user;
        if (!(session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.email)) return;
        setIsResendingEmail(true);
        try {
            const response = await fetch('/api/resend-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: session.user.email
                })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Verification email sent! Please check your inbox.');
            } else {
                alert(data.message || 'Failed to send verification email.');
            }
        } catch (error) {
            console.error('Error resending verification email:', error);
            alert('An error occurred while sending the verification email.');
        } finally{
            setIsResendingEmail(false);
        }
    };
    // temporary filtering as a proof of concept. will replace later when the database is up and running
    const filteredMovies = movies.filter((movie)=>movie.title.toLowerCase().includes(search.toLowerCase()) && (selectedGenres.length === 0 || selectedGenres.some((genre)=>movie.genre.includes(genre))));
    const currentlyRunning = filteredMovies.filter((m)=>m.isCurrentlyRunning);
    const comingSoon = filteredMovies.filter((m)=>!m.isCurrentlyRunning);
    // console.log(movies);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "font-sans min-h-screen bg-gray-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "mb-12 flex flex-col sm:flex-row items-center justify-center gap-4 px-8 sm:px-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$SearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            value: search,
                            onChange: setSearch
                        }, void 0, false, {
                            fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$GenreDropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            selected: selectedGenres,
                            setSelected: setSelectedGenres
                        }, void 0, false, {
                            fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            isAuthenticated && (!isEmailVerified || showVerificationRequired) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-8 sm:px-32 mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$EmailVerificationBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    userEmail: (session === null || session === void 0 ? void 0 : (_session_user1 = session.user) === null || _session_user1 === void 0 ? void 0 : _session_user1.email) || undefined,
                    onResendEmail: handleResendVerificationEmail,
                    isResending: isResendingEmail
                }, void 0, false, {
                    fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
                    lineNumber: 107,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
                lineNumber: 106,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "px-8 sm:px-32 pb-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-white text-2xl font-bold mb-4",
                                children: "Currently Running"
                            }, void 0, false, {
                                fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$MovieList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                movies: currentlyRunning
                            }, void 0, false, {
                                fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-white text-2xl font-bold mb-4",
                                children: "Coming Soon"
                            }, void 0, false, {
                                fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$MovieList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                movies: comingSoon
                            }, void 0, false, {
                                fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(HomeContent, "mkCcSbS10fL9NjbFFmbm4bsoL9s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = HomeContent;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-900 flex items-center justify-center text-white",
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
            lineNumber: 131,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeContent, {}, void 0, false, {
            fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
            lineNumber: 132,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/CinemaBooker/cinema-booker/src/app/page.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
_c1 = Home;
var _c, _c1;
__turbopack_context__.k.register(_c, "HomeContent");
__turbopack_context__.k.register(_c1, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=CinemaBooker_cinema-booker_src_app_f563b274._.js.map