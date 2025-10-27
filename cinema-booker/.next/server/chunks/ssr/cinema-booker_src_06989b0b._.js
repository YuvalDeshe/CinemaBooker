module.exports = [
"[project]/cinema-booker/src/types/User.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Status",
    ()=>Status,
    "default",
    ()=>User
]);
const Status = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    SUSPENDED: "Suspended"
};
class User {
    fname;
    lname;
    phone;
    email;
    password;
    cards;
    address;
    promo;
    status;
    constructor(fname, lname, phone, email, password, promo, address, cards){
        this.fname = fname;
        this.lname = lname;
        this.phone = phone;
        this.email = email;
        this.password = password;
        if (cards !== undefined) {
            this.cards = cards;
        } else this.cards = [];
        if (address !== undefined) {
            this.address = address;
        } else this.address = {
            street: "",
            city: "",
            state: "",
            zip: ""
        };
        this.promo = promo;
        this.status = Status.INACTIVE;
    }
    getFirstName() {
        return this.fname;
    }
    setFirstName(name) {
        this.fname = name;
    }
    getLastName() {
        return this.lname;
    }
    setLastName(name) {
        this.lname = name;
    }
    getPhoneNumber() {
        return this.phone;
    }
    setPhoneNumber(number) {
        this.phone = number;
    }
    getEmail() {
        return this.email;
    }
    setEmail(address) {
        this.email = address;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
    getPromo() {
        return this.promo;
    }
    setPromo(promo) {
        this.promo = promo;
    }
    getCards() {
        return this.cards;
    }
    addCard(card) {
        if (this.cards.length >= 3) {
            throw new Error("Couldn't add card, user already has too many saved cards.");
        } else {
            this.cards.push(card);
        }
    }
    removeCard(index) {
        if (index < 0 || index > 2) {
            throw new Error("Invalid index. Index should be an Integer from 0-2.");
        }
        this.cards.splice(index, 1);
    }
    setCards(cards) {
        if (cards.length > 3) {
            throw new Error("Couldn't set cards array. User can only have 3 cards.");
        }
        this.cards = cards;
    }
    getAddress() {
        return this.address;
    }
    setAddress(street, city, state, zip) {
        this.address = {
            street,
            city,
            state,
            zip
        };
    }
    getStreet() {
        return this.address.street;
    }
    setStreet(street) {
        this.address.street = street;
    }
    getCity() {
        return this.address.city;
    }
    setCity(city) {
        this.address.city = city;
    }
    getState() {
        return this.address.state;
    }
    setState(state) {
        this.address.state = state;
    }
    getZip() {
        return this.address.zip;
    }
    setZip(zip) {
        // Accept 5-digit or 5+4 ZIP formats
        if (!/^\d{5}(-\d{4})?$/.test(zip)) {
            throw new Error("Invalid ZIP code format.");
        }
        this.address.zip = zip;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        if (!Object.values(Status).includes(status)) {
            throw new Error(`Could not change user status. Status must be one of the following:\n${Status.ACTIVE}\n${Status.INACTIVE}\n${Status.SUSPENDED}`);
        }
        this.status = status;
    }
}
}),
"[project]/cinema-booker/src/types/Card.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Card
]);
class Card {
    cardType;
    cardNumber;
    expMonth;
    expYear;
    billingStreet;
    billingCity;
    billingState;
    billingZip;
    constructor(cardType, cardNumber, expMonth, expYear, billingStreet, billingCity, billingState, billingZip){
        this.cardType = cardType;
        this.cardNumber = cardNumber;
        this.expMonth = expMonth;
        this.expYear = expYear;
        this.billingStreet = billingStreet;
        this.billingCity = billingCity;
        this.billingState = billingState;
        this.billingZip = billingZip;
    }
    getCardType() {
        return this.cardType;
    }
    setCardType(type) {
        let input = type.toLowerCase();
        if (input !== 'credit' && input !== 'debit') {
            throw new Error("Couldn't set card. Invalid card type provided.");
        } else {
            this.cardType = input;
        }
    }
    getCardNumber() {
        return this.cardNumber;
    }
    setCardNumber(number) {
        this.cardNumber = number;
    }
    getExpMonth() {
        return this.expMonth;
    }
    setExpMonth(month) {
        let num = Number(month);
        if (!Number.isInteger(num) || num < 1 || num > 12) {
            throw new Error("Invalid expiration month. Must be an integer between 1 and 12.");
        }
        this.expMonth = month;
    }
    getExpYear() {
        return this.expYear;
    }
    setExpYear(year) {
        let num = Number(year);
        const nowYear = new Date().getFullYear();
        if (!Number.isInteger(num) || num < nowYear) {
            throw new Error(`Invalid expiration year. Year must not be in the past.`);
        }
        this.expYear = year;
    }
    getBillingStreet() {
        return this.billingStreet;
    }
    setBillingStreet(street) {
        this.billingStreet = street;
    }
    getBillingCity() {
        return this.billingCity;
    }
    setBillingCity(city) {
        this.billingCity = city;
    }
    getBillingState() {
        return this.billingState;
    }
    setBillingState(state) {
        this.billingState = state;
    }
    getBillingZip() {
        return this.billingZip;
    }
    setBillingZip(zip) {
        // Accept 5-digit or 5+4 ZIP formats
        if (!/^\d{5}(-\d{4})?$/.test(zip)) {
            throw new Error("Invalid ZIP code format.");
        }
        this.billingZip = zip;
    }
}
}),
"[project]/cinema-booker/src/app/components/RegisterForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegisterForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$types$2f$User$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/src/types/User.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$types$2f$Card$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/src/types/Card.ts [app-ssr] (ecmascript)");
;
;
;
;
function RegisterForm({ handleRegister }) {
    const [enterCard, setEnterCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const checkCardBox = ()=>setEnterCard(!enterCard);
    const [enterAddress, setEnterAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const checkAddressBox = ()=>setEnterAddress(!enterAddress);
    const onSubmit = (e)=>{
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const fname = String(data.get('fname') ?? '');
        const lname = String(data.get('lname') ?? '');
        const phone = String(data.get('phone') ?? '');
        const email = String(data.get('email') ?? '');
        const password = String(data.get('password') ?? '');
        const cardType = String(data.get('cardType') ?? '');
        const cardNumber = String(data.get('cardNumber') ?? '');
        const expMonth = String(data.get('expMonth') ?? '');
        const expYear = String(data.get('expYear') ?? '');
        const billingStreet = String(data.get('billingStreet') ?? '');
        const billingCity = String(data.get('billingCity') ?? '');
        const billingState = String(data.get('billingState') ?? '');
        const billingZip = String(data.get('billingZip') ?? '');
        const street = String(data.get('street') ?? '');
        const city = String(data.get('city') ?? '');
        const state = String(data.get('state') ?? '');
        const zip = String(data.get('zip') ?? '');
        const promo = Boolean(data.get('promo'));
        let card = new __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$types$2f$Card$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](cardType, cardNumber, expMonth, expYear, billingStreet, billingCity, billingState, billingZip);
        let address = {
            street,
            city,
            state,
            zip
        };
        let user = new __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$types$2f$User$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](fname, lname, phone, email, password, promo, address, [
            card
        ]);
        if (user.getCards()[0].getCardType() == '') {
            user.removeCard(0);
        }
        handleRegister(user);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen flex items-center justify-center bg-[#0b1221] text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BackgroundReel, {}, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                lineNumber: 51,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full max-w-2xl p-[1px] rounded-2xl bg-gradient-to-b from-blue-500/60 via-blue-400/20 to-transparent",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#1b2235]/85 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/60 p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-semibold text-center mb-2",
                            children: "Create Account"
                        }, void 0, false, {
                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                            lineNumber: 55,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-sm text-gray-300 mb-6",
                            children: [
                                "Join ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium",
                                    children: "Cinema E-Booking"
                                }, void 0, false, {
                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                    lineNumber: 57,
                                    columnNumber: 16
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                            lineNumber: 56,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: onSubmit,
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "fname",
                                                    className: "block mb-1 text-gray-300",
                                                    children: "First name"
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 64,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "fname",
                                                    name: "fname",
                                                    required: true,
                                                    type: "text",
                                                    className: "w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400",
                                                    placeholder: "Jane"
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                            lineNumber: 63,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "lname",
                                                    className: "block mb-1 text-gray-300",
                                                    children: "Last name"
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "lname",
                                                    name: "lname",
                                                    required: true,
                                                    type: "text",
                                                    className: "w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400",
                                                    placeholder: "Doe"
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                            lineNumber: 71,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "phone",
                                                    className: "block mb-1 text-gray-300",
                                                    children: "Phone number"
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "phone",
                                                    name: "phone",
                                                    required: true,
                                                    type: "tel",
                                                    className: "w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400",
                                                    placeholder: "(555) 555-5555"
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                            lineNumber: 79,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "email",
                                                    className: "block mb-1 text-gray-300",
                                                    children: "Email"
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "email",
                                                    name: "email",
                                                    required: true,
                                                    type: "email",
                                                    autoComplete: "email",
                                                    className: "w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400",
                                                    placeholder: "you@example.com"
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 89,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                            lineNumber: 87,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:col-span-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "password",
                                                    className: "block mb-1 text-gray-300",
                                                    children: "Password"
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "password",
                                                    name: "password",
                                                    required: true,
                                                    type: "password",
                                                    autoComplete: "new-password",
                                                    className: "w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400",
                                                    placeholder: "••••••••"
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                            lineNumber: 95,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                    lineNumber: 62,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "inline-flex items-center gap-2 text-gray-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    name: "enterCard",
                                                    onClick: checkCardBox,
                                                    className: "h-4 w-4 rounded border-gray-400 text-blue-500 focus:ring-blue-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 15
                                                }, this),
                                                "Enter payment details?"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                            lineNumber: 107,
                                            columnNumber: 13
                                        }, this),
                                        enterCard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-gray-700/60 bg-[#22283b]/50 p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-6 flex-wrap",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "inline-flex items-center gap-2 text-gray-200",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "radio",
                                                                    required: true,
                                                                    name: "cardType",
                                                                    value: "debit",
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                    lineNumber: 121,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "Debit"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "inline-flex items-center gap-2 text-gray-200",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "radio",
                                                                    required: true,
                                                                    name: "cardType",
                                                                    value: "credit",
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                    lineNumber: 125,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "Credit"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                            lineNumber: 124,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 grid grid-cols-1 md:grid-cols-3 gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "md:col-span-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    htmlFor: "cardNumber",
                                                                    className: "block mb-1 text-gray-300",
                                                                    children: "Card number"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                    lineNumber: 132,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    id: "cardNumber",
                                                                    name: "cardNumber",
                                                                    required: true,
                                                                    type: "text",
                                                                    className: "w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400",
                                                                    placeholder: "4242 4242 4242 4242"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                    lineNumber: 133,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                            lineNumber: 131,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    htmlFor: "expMonth",
                                                                    className: "block mb-1 text-gray-300",
                                                                    children: "Exp. month"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                    lineNumber: 140,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    id: "expMonth",
                                                                    name: "expMonth",
                                                                    required: true,
                                                                    type: "text",
                                                                    className: "w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400",
                                                                    placeholder: "MM"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                    lineNumber: 141,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                            lineNumber: 139,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    htmlFor: "expYear",
                                                                    className: "block mb-1 text-gray-300",
                                                                    children: "Exp. year"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                    lineNumber: 148,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    id: "expYear",
                                                                    name: "expYear",
                                                                    required: true,
                                                                    type: "text",
                                                                    className: "w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400",
                                                                    placeholder: "YYYY"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                    lineNumber: 149,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                            lineNumber: 147,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-300 mb-2",
                                                            children: "Billing address"
                                                        }, void 0, false, {
                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                            lineNumber: 158,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "md:col-span-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            htmlFor: "billingStreet",
                                                                            className: "block mb-1 text-gray-300",
                                                                            children: "Street"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                            lineNumber: 161,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            id: "billingStreet",
                                                                            name: "billingStreet",
                                                                            required: true,
                                                                            type: "text",
                                                                            className: "w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                            lineNumber: 162,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                    lineNumber: 160,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            htmlFor: "billingCity",
                                                                            className: "block mb-1 text-gray-300",
                                                                            children: "City"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                            lineNumber: 168,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            id: "billingCity",
                                                                            name: "billingCity",
                                                                            required: true,
                                                                            type: "text",
                                                                            className: "w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                            lineNumber: 169,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                    lineNumber: 167,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            htmlFor: "billingState",
                                                                            className: "block mb-1 text-gray-300",
                                                                            children: "State"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                            lineNumber: 175,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            id: "billingState",
                                                                            name: "billingState",
                                                                            required: true,
                                                                            type: "text",
                                                                            className: "w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                            lineNumber: 176,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                    lineNumber: 174,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            htmlFor: "billingZip",
                                                                            className: "block mb-1 text-gray-300",
                                                                            children: "Zip"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                            lineNumber: 182,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            id: "billingZip",
                                                                            name: "billingZip",
                                                                            required: true,
                                                                            type: "text",
                                                                            className: "w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                            lineNumber: 183,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                    lineNumber: 181,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                            lineNumber: 159,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                    lineNumber: 106,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "inline-flex items-center gap-2 text-gray-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    name: "enterAddress",
                                                    onClick: checkAddressBox,
                                                    className: "h-4 w-4 rounded border-gray-400 text-blue-500 focus:ring-blue-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 15
                                                }, this),
                                                "Enter address?"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                            lineNumber: 196,
                                            columnNumber: 13
                                        }, this),
                                        enterAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-gray-700/60 bg-[#22283b]/50 p-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "md:col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "street",
                                                                className: "block mb-1 text-gray-300",
                                                                children: "Street"
                                                            }, void 0, false, {
                                                                fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                lineNumber: 210,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                id: "street",
                                                                name: "street",
                                                                required: true,
                                                                type: "text",
                                                                className: "w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                lineNumber: 211,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "city",
                                                                className: "block mb-1 text-gray-300",
                                                                children: "City"
                                                            }, void 0, false, {
                                                                fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                lineNumber: 217,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                id: "city",
                                                                name: "city",
                                                                required: true,
                                                                type: "text",
                                                                className: "w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                lineNumber: 218,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                        lineNumber: 216,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "state",
                                                                className: "block mb-1 text-gray-300",
                                                                children: "State"
                                                            }, void 0, false, {
                                                                fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                lineNumber: 224,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                id: "state",
                                                                name: "state",
                                                                required: true,
                                                                type: "text",
                                                                className: "w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                lineNumber: 225,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                        lineNumber: 223,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "zip",
                                                                className: "block mb-1 text-gray-300",
                                                                children: "Zip"
                                                            }, void 0, false, {
                                                                fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                lineNumber: 231,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                id: "zip",
                                                                name: "zip",
                                                                required: true,
                                                                type: "text",
                                                                className: "w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                                lineNumber: 232,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                        lineNumber: 230,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                                lineNumber: 208,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                            lineNumber: 207,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                    lineNumber: 195,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "inline-flex items-center gap-2 text-gray-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            name: "promo",
                                            className: "h-4 w-4 rounded border-gray-400 text-blue-500 focus:ring-blue-400"
                                        }, void 0, false, {
                                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                            lineNumber: 244,
                                            columnNumber: 13
                                        }, this),
                                        "Sign up for promotional emails?"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                    lineNumber: 243,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-md transition-all duration-200",
                                    children: "Register"
                                }, void 0, false, {
                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                    lineNumber: 249,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                            lineNumber: 60,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center mt-6 text-gray-300",
                            children: [
                                "Already have an account?",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/login",
                                    className: "text-blue-300 hover:text-blue-200 underline",
                                    children: "Log in"
                                }, void 0, false, {
                                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                                    lineNumber: 259,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                            lineNumber: 257,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                    lineNumber: 54,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
                lineNumber: 53,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cinema-booker/src/app/components/RegisterForm.tsx",
        lineNumber: 50,
        columnNumber: 3
    }, this);
}
}),
"[project]/cinema-booker/src/app/register/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Register
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$RegisterForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/src/app/components/RegisterForm.tsx [app-ssr] (ecmascript)");
'use client';
;
;
// TODO: move this function to its own class to follow SOLID design principles and adhere to MVC framework
async function register(user) {
    const userPayload = {
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        email: user.getEmail(),
        password: user.getPassword(),
        phone: user.getPhoneNumber(),
        userType: "CUSTOMER",
        userStatus: user.getStatus(),
        homeAddress: {
            street: user.getAddress().street,
            city: user.getAddress().city,
            state: user.getAddress().state,
            zip: user.getAddress().zip
        },
        /* 
                TODO:
                make this field optional somehow. the user does not need
                to provide a payment method at registration.
                as is, this will throw an error if the user did not
                enter a card.
                */ paymentCard: [
            {
                cardType: user.getCards()[0].getCardType(),
                cardNumber: user.getCards()[0].getCardNumber(),
                // TODO: expand expDate in the database to expMonth and expYear
                expMonth: user.getCards()[0].getExpMonth(),
                expYear: user.getCards()[0].getExpYear(),
                billingAddress: {
                    street: user.getCards()[0].getBillingStreet(),
                    city: user.getCards()[0].getBillingCity(),
                    state: user.getCards()[0].getBillingState(),
                    zip: user.getCards()[0].getBillingZip()
                }
            }
        ],
        // TODO: add orderHistory to the database
        orderHistory: [],
        isRegisteredForPromos: user.getPromo()
    };
    console.log("Attempting to register user with payload:", userPayload);
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userPayload)
        });
        const data = await response.json();
        if (response.ok) {
            console.log("Registration successful!", data);
            window.location.href = '/login';
        } else {
            console.error("Registration failed:", data.message);
        }
    } catch (error) {
        console.error("Network or unexpected error during registration:", error);
    }
}
function Register() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$src$2f$app$2f$components$2f$RegisterForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            handleRegister: register
        }, void 0, false, {
            fileName: "[project]/cinema-booker/src/app/register/page.tsx",
            lineNumber: 79,
            columnNumber: 25
        }, this)
    }, void 0, false, {
        fileName: "[project]/cinema-booker/src/app/register/page.tsx",
        lineNumber: 78,
        columnNumber: 17
    }, this);
}
}),
];

//# sourceMappingURL=cinema-booker_src_06989b0b._.js.map