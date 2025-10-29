module.exports = [
"[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/styles.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "buttonText": "styles-module__8hwUrq__buttonText",
  "buttonsContainer": "styles-module__8hwUrq__buttonsContainer",
  "description": "styles-module__8hwUrq__description",
  "homeButton": "styles-module__8hwUrq__homeButton",
  "hr": "styles-module__8hwUrq__hr",
  "icon": "styles-module__8hwUrq__icon",
  "mainDiv": "styles-module__8hwUrq__mainDiv",
  "mainHeading": "styles-module__8hwUrq__mainHeading",
  "movieInfo": "styles-module__8hwUrq__movieInfo",
  "movieInfoItems": "styles-module__8hwUrq__movieInfoItems",
  "moviePoster": "styles-module__8hwUrq__moviePoster",
  "movieTitle": "styles-module__8hwUrq__movieTitle",
  "primaryMovieDiv": "styles-module__8hwUrq__primaryMovieDiv",
  "showTimeButtons": "styles-module__8hwUrq__showTimeButtons",
  "subSectionHeading": "styles-module__8hwUrq__subSectionHeading",
  "subSectionItems": "styles-module__8hwUrq__subSectionItems",
  "tempButtonCSS": "styles-module__8hwUrq__tempButtonCSS",
  "topBar": "styles-module__8hwUrq__topBar",
  "trailer": "styles-module__8hwUrq__trailer",
});
}),
"[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MoviePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/styles.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
//Array of hardcoded showtimes, loaded into the page dynamically.
const SHOWTIMES = [
    "9:00 a.m.",
    "12:00 p.m.",
    "3:00 p.m.",
    "6:00 p.m.",
    "9:00 p.m."
];
function MoviePage() {
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSession"])();
    const [movie, setMovie] = __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(null);
    __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!id) return;
        fetch(`/api/movies/${id}`).then((res)=>res.json()).then((data)=>setMovie(data));
    }, [
        id
    ]);
    if (!movie) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mainDiv,
        children: "Loading..."
    }, void 0, false, {
        fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
        lineNumber: 47,
        columnNumber: 22
    }, this);
    //array of cast members to string
    let actorsList = "";
    if (Array.isArray(movie.castList)) {
        actorsList = movie.castList.join(", ");
    } else if (typeof movie.castList === "string") {
        actorsList = movie.castList;
    }
    // embedded links # fixed error issue with db
    let embedLink = "";
    if (movie.trailerLink && typeof movie.trailerLink === "string") {
        const lastEq = movie.trailerLink.lastIndexOf("=");
        embedLink = "https://www.youtube.com/embed/" + (lastEq !== -1 ? movie.trailerLink.substring(lastEq + 1) : movie.trailerLink);
    }
    const returnHandler = ()=>{
        router.push('/');
    };
    const goToBooking = (timeLabel)=>{
        if (!session) {
            // Redirect to login with a return URL
            router.push(`/login?redirect=/movie/${id}/booking&time=${encodeURIComponent(timeLabel)}`);
            return;
        }
        if (session.user && !session.user.isEmailVerified) {
            // Show message about email verification
            alert("Please verify your email address before booking tickets. Check your inbox for a verification email.");
            return;
        }
        // Proceed to booking
        router.push(`/movie/${id}/booking?time=${encodeURIComponent(timeLabel)}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mainDiv,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].movieTitle,
                children: movie.title
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].primaryMovieDiv,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].moviePoster,
                        src: movie.posterUrl
                    }, void 0, false, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].trailer,
                        src: embedLink,
                        title: "YouTube video player",
                        // style border
                        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                        allowFullScreen: true
                    }, void 0, false, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].movieInfo,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].movieInfoItems,
                        children: movie.runTime
                    }, void 0, false, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].movieInfoItems,
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].movieInfoItems,
                        children: movie.genre
                    }, void 0, false, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].movieInfoItems,
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].movieInfoItems,
                        children: movie.rating
                    }, void 0, false, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].description,
                children: movie.description
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hr
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subSectionHeading,
                children: "Director:"
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subSectionItems,
                children: movie.director
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hr
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subSectionHeading,
                children: "Cast:"
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subSectionItems,
                children: actorsList
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hr
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subSectionHeading,
                children: "Showtimes:"
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            !session && movie.isCurrentlyRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subSectionItems,
                style: {
                    marginBottom: '10px',
                    color: '#fbbf24'
                },
                children: "Sign in to book tickets for these showtimes:"
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, this),
            movie.isCurrentlyRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].buttonsContainer,
                children: SHOWTIMES.map((value, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].showTimeButtons,
                        onClick: ()=>goToBooking(value),
                        children: [
                            value,
                            !session && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '10px',
                                    display: 'block'
                                },
                                children: "Sign in to book"
                            }, void 0, false, {
                                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                                lineNumber: 134,
                                columnNumber: 28
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                        lineNumber: 128,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 126,
                columnNumber: 9
            }, this),
            !movie.isCurrentlyRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f5b$id$5d2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subSectionItems,
                children: "Showtimes will be available when the movie is running."
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
                lineNumber: 140,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/CinemaBooker/cinema-booker/src/app/movie/[id]/page.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=CinemaBooker_cinema-booker_src_app_movie_%5Bid%5D_4d9572a9._.js.map