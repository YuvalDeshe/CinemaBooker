module.exports = [
"[project]/CinemaBooker/cinema-booker/src/app/verify-email/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VerifyEmailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function VerifyEmailContent() {
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("loading");
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const token = searchParams.get("token");
        if (!token) {
            setStatus("error");
            return;
        }
        // Call the verification API
        const verifyEmail = async ()=>{
            try {
                const response = await fetch(`/api/verify-email?token=${token}`);
                if (response.ok) {
                    setStatus("success");
                } else {
                    setStatus("error");
                }
            } catch (error) {
                setStatus("error");
            }
        };
        verifyEmail();
    }, [
        searchParams
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '50px',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif'
        },
        children: [
            status === "loading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Verifying..."
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/verify-email/page.tsx",
                lineNumber: 38,
                columnNumber: 32
            }, this),
            status === "success" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Email verified!"
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/verify-email/page.tsx",
                lineNumber: 39,
                columnNumber: 32
            }, this),
            status === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Verification failed"
            }, void 0, false, {
                fileName: "[project]/CinemaBooker/cinema-booker/src/app/verify-email/page.tsx",
                lineNumber: 40,
                columnNumber: 30
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/CinemaBooker/cinema-booker/src/app/verify-email/page.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
function VerifyEmailPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-900 flex items-center justify-center text-white",
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/CinemaBooker/cinema-booker/src/app/verify-email/page.tsx",
            lineNumber: 47,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VerifyEmailContent, {}, void 0, false, {
            fileName: "[project]/CinemaBooker/cinema-booker/src/app/verify-email/page.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/CinemaBooker/cinema-booker/src/app/verify-email/page.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=CinemaBooker_cinema-booker_src_app_verify-email_page_tsx_de8425a6._.js.map