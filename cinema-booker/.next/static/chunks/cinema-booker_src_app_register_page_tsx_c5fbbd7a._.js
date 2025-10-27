(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/cinema-booker/src/app/register/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegisterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function RegisterPage() {
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        isRegisteredForPromos: false
    });
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleChange = (e)=>{
        const { name, value, type, checked } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);
        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            setIsLoading(false);
            return;
        }
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                    isRegisteredForPromos: formData.isRegisteredForPromos
                })
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess(data.message || "Registration successful! Please check your email to verify your account.");
                // Clear form
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                    isRegisteredForPromos: false
                });
                // Redirect to login after a delay
                setTimeout(()=>{
                    router.push("/login");
                }, 3000);
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (error) {
            setError("An error occurred during registration");
            console.error("Registration error:", error);
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen flex items-center justify-center bg-[#0b1221] text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BackgroundReel, {}, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                lineNumber: 96,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-b from-blue-500/60 via-blue-400/20 to-transparent",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#1b2235]/85 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/60 p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-semibold text-center mb-2",
                            children: "Register"
                        }, void 0, false, {
                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                            lineNumber: 100,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-sm text-gray-300 mb-6",
                            children: [
                                "Create your ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium",
                                    children: "Cinema E-Booking"
                                }, void 0, false, {
                                    fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 23
                                }, this),
                                " account"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                            lineNumber: 101,
                            columnNumber: 9
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-sm text-red-200",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 rounded-md border border-green-500/60 bg-green-500/10 px-3 py-2 text-sm text-green-200",
                            children: success
                        }, void 0, false, {
                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "firstName",
                                                    className: "block mb-1 text-gray-300",
                                                    children: "First Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "firstName",
                                                    name: "firstName",
                                                    type: "text",
                                                    required: true,
                                                    autoComplete: "given-name",
                                                    className: "w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400",
                                                    placeholder: "John",
                                                    value: formData.firstName,
                                                    onChange: handleChange
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                            lineNumber: 119,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "lastName",
                                                    className: "block mb-1 text-gray-300",
                                                    children: "Last Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "lastName",
                                                    name: "lastName",
                                                    type: "text",
                                                    required: true,
                                                    autoComplete: "family-name",
                                                    className: "w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400",
                                                    placeholder: "Doe",
                                                    value: formData.lastName,
                                                    onChange: handleChange
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                            lineNumber: 136,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                    lineNumber: 118,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "email",
                                            className: "block mb-1 text-gray-300",
                                            children: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                            lineNumber: 155,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "email",
                                            name: "email",
                                            type: "email",
                                            required: true,
                                            autoComplete: "email",
                                            className: "w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400",
                                            placeholder: "you@example.com",
                                            value: formData.email,
                                            onChange: handleChange
                                        }, void 0, false, {
                                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                            lineNumber: 158,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                    lineNumber: 154,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "password",
                                            className: "block mb-1 text-gray-300",
                                            children: "Password"
                                        }, void 0, false, {
                                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "password",
                                            name: "password",
                                            type: "password",
                                            required: true,
                                            autoComplete: "new-password",
                                            className: "w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400",
                                            placeholder: "••••••••",
                                            value: formData.password,
                                            onChange: handleChange
                                        }, void 0, false, {
                                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                            lineNumber: 175,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                    lineNumber: 171,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "confirmPassword",
                                            className: "block mb-1 text-gray-300",
                                            children: "Confirm Password"
                                        }, void 0, false, {
                                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                            lineNumber: 189,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "confirmPassword",
                                            name: "confirmPassword",
                                            type: "password",
                                            required: true,
                                            autoComplete: "new-password",
                                            className: "w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400",
                                            placeholder: "••••••••",
                                            value: formData.confirmPassword,
                                            onChange: handleChange
                                        }, void 0, false, {
                                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                            lineNumber: 192,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                    lineNumber: 188,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "isRegisteredForPromos",
                                            name: "isRegisteredForPromos",
                                            type: "checkbox",
                                            className: "h-4 w-4 text-indigo-400 focus:ring-blue-400 border-gray-400 rounded bg-white",
                                            checked: formData.isRegisteredForPromos,
                                            onChange: handleChange
                                        }, void 0, false, {
                                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                            lineNumber: 206,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "isRegisteredForPromos",
                                            className: "ml-2 block text-sm text-gray-300",
                                            children: "Subscribe to promotional emails"
                                        }, void 0, false, {
                                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                            lineNumber: 214,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                    lineNumber: 205,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isLoading,
                                    className: "w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md transition-all duration-200",
                                    children: isLoading ? "Creating account…" : "Register"
                                }, void 0, false, {
                                    fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                    lineNumber: 219,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                            lineNumber: 117,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center mt-6 text-gray-300",
                            children: [
                                "Already have an account?",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/login",
                                    className: "text-blue-300 hover:text-blue-200 underline",
                                    children: "Login"
                                }, void 0, false, {
                                    fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                                    lineNumber: 230,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                            lineNumber: 228,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                    lineNumber: 99,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/register/page.tsx",
                lineNumber: 98,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cinema-booker/src/app/register/page.tsx",
        lineNumber: 95,
        columnNumber: 3
    }, this);
}
_s(RegisterPage, "KBfLO6lB5PS/YXU8OE22sSwk/do=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = RegisterPage;
var _c;
__turbopack_context__.k.register(_c, "RegisterPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=cinema-booker_src_app_register_page_tsx_c5fbbd7a._.js.map