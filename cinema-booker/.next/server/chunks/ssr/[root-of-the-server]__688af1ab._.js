module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/cinema-booker/src/app/movie/MOVIE_ID/styles.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "buttonText": "styles-module__haxAPq__buttonText",
  "buttonsContainer": "styles-module__haxAPq__buttonsContainer",
  "description": "styles-module__haxAPq__description",
  "homeButton": "styles-module__haxAPq__homeButton",
  "hr": "styles-module__haxAPq__hr",
  "icon": "styles-module__haxAPq__icon",
  "mainDiv": "styles-module__haxAPq__mainDiv",
  "mainHeading": "styles-module__haxAPq__mainHeading",
  "movieInfo": "styles-module__haxAPq__movieInfo",
  "movieInfoItems": "styles-module__haxAPq__movieInfoItems",
  "moviePoster": "styles-module__haxAPq__moviePoster",
  "movieTitle": "styles-module__haxAPq__movieTitle",
  "primaryMovieDiv": "styles-module__haxAPq__primaryMovieDiv",
  "showTimeButtons": "styles-module__haxAPq__showTimeButtons",
  "subSectionHeading": "styles-module__haxAPq__subSectionHeading",
  "subSectionItems": "styles-module__haxAPq__subSectionItems",
  "tempButtonCSS": "styles-module__haxAPq__tempButtonCSS",
  "topBar": "styles-module__haxAPq__topBar",
  "trailer": "styles-module__haxAPq__trailer",
});
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MoviePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/@fortawesome/react-fontawesome/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/@fortawesome/free-solid-svg-icons/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/cinema-booker/src/app/movie/MOVIE_ID/styles.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
/** 
  NOTE: This page is located under the URL of movie/MOVIE_ID
  When the DB is implemented, have the movie's ID (or name or something else)
  replace "MOVIE_ID" (with "[id]" if I'm not mistaken) in the URL so that movies 
  can be loaded dynamically.
*/ //Array of hardcoded showtimes, loaded into the page dynamically.
const SHOWTIMES = [
    "9:00 a.m.",
    "12:00 p.m.",
    "3:00 p.m.",
    "6:00 p.m.",
    "9:00 p.m."
];
/**
  This is the movie object. Once we have the DB up and running, replace the below fields with relevant info.
  Feel free to replace if you want, but currently, the webpage reads the info directly from
  this object called "movie".
*/ const movie = {
    title: "Movie Title",
    genre: "GENRE",
    description: "This is the description for the movie. Lorem ipsum dolor sit amet, \
  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore \
  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi \
  ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate \
  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat \
  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    posterImgUrl: "https://www.nextdayflyers.com/blog/wp-content/uploads/2012/02/drive.jpg",
    trailerLink: "https://www.youtube.com/watch?v=MtN1YnoL46Q",
    director: "Director Information",
    castList: [
        "Actor1",
        "Actor2",
        "Actor3",
        "Actor4",
        "Actor5"
    ],
    rating: "RATING",
    runtime: "RUNTIME"
};
function MoviePage() {
    //Turns array of actors in castList into a single comma-separated string.
    let actorsList = "";
    movie.castList.forEach((actor, index)=>{
        if (index == movie.castList.length - 1) {
            actorsList = actorsList + actor;
        } else {
            actorsList += actor + ", ";
        }
    });
    //Makes the movies trailer youtube link embeddable.
    let embedLink = "https://www.youtube.com/embed/" + movie.trailerLink.substring(movie.trailerLink.lastIndexOf("=") + 1, movie.trailerLink.length);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const returnHandler = ()=>{
        router.push('/');
    };
    const goToBooking = (timeLabel)=>{
        router.push(`/movie/MOVIE_ID/booking?time=${encodeURIComponent(timeLabel)}`);
    };
    // (kept but unused) If you later want a generic booking handler:
    const bookMovieHandler = ()=>{
        router.push('/'); //EDIT THIS PART TO NAVIGATE TO THE BOOKING PAGE
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mainDiv,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].topBar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].homeButton,
                        onClick: returnHandler,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].icon,
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faHouse"]
                            }, void 0, false, {
                                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].buttonText,
                                children: "Home"
                            }, void 0, false, {
                                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mainHeading,
                        children: "Cinema E-Booking Site"
                    }, void 0, false, {
                        fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tempButtonCSS,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].icon,
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faHouse"]
                            }, void 0, false, {
                                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].buttonText,
                                children: "Home"
                            }, void 0, false, {
                                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    " "
                ]
            }, void 0, true, {
                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].movieTitle,
                children: movie.title
            }, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].primaryMovieDiv,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].moviePoster,
                        src: movie.posterImgUrl
                    }, void 0, false, {
                        fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].trailer,
                        src: embedLink,
                        title: "YouTube video player",
                        //style{{border: "none" }} 
                        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                        allowFullScreen: true
                    }, void 0, false, {
                        fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].movieInfo,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].movieInfoItems,
                        children: movie.runtime
                    }, void 0, false, {
                        fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].movieInfoItems,
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].movieInfoItems,
                        children: movie.genre
                    }, void 0, false, {
                        fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].movieInfoItems,
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].movieInfoItems,
                        children: movie.rating
                    }, void 0, false, {
                        fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].description,
                children: movie.description
            }, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hr
            }, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subSectionHeading,
                children: "Director:"
            }, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subSectionItems,
                children: movie.director
            }, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hr
            }, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subSectionHeading,
                children: "Cast:"
            }, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subSectionItems,
                children: actorsList
            }, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hr
            }, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subSectionHeading,
                children: "Showtimes:"
            }, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].buttonsContainer,
                children: SHOWTIMES.map((value, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$movie$2f$MOVIE_ID$2f$styles$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].showTimeButtons,
                        onClick: ()=>goToBooking(value),
                        children: value
                    }, index, false, {
                        fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cinema-booker/src/app/movie/MOVIE_ID/page.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__688af1ab._.js.map