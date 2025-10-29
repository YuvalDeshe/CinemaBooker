module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/CinemaBooker/cinema-booker/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "build/chunks/cf061_8fd9a9e7._.js",
  "build/chunks/[root-of-the-server]__5a5d5740._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/CinemaBooker/cinema-booker/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];