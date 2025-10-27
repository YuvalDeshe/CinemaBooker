(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/cinema-booker/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cinema-booker/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/cinema-booker/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/cinema-booker/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cinema-booker/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/cinema-booker/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/cinema-booker/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/cinema-booker/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/cinema-booker/node_modules/@fortawesome/react-fontawesome/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FontAwesomeIcon",
    ()=>FontAwesomeIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/cinema-booker/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f40$fortawesome$2f$fontawesome$2d$svg$2d$core$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/@fortawesome/fontawesome-svg-core/index.mjs [app-client] (ecmascript)");
;
;
// src/components/FontAwesomeIcon.tsx
// src/utils/camelize.ts
function _isNumerical(object) {
    object = object - 0;
    return object === object;
}
function camelize(string) {
    if (_isNumerical(string)) {
        return string;
    }
    string = string.replaceAll(/[_-]+(.)?/g, (_, chr)=>{
        return chr ? chr.toUpperCase() : "";
    });
    return string.charAt(0).toLowerCase() + string.slice(1);
}
// src/converter.ts
function capitalize(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
}
var styleCache = /* @__PURE__ */ new Map();
var STYLE_CACHE_LIMIT = 1e3;
function styleToObject(style) {
    if (styleCache.has(style)) {
        return styleCache.get(style);
    }
    const result = {};
    let start = 0;
    const len = style.length;
    while(start < len){
        const semicolonIndex = style.indexOf(";", start);
        const end = semicolonIndex === -1 ? len : semicolonIndex;
        const pair = style.slice(start, end).trim();
        if (pair) {
            const colonIndex = pair.indexOf(":");
            if (colonIndex > 0) {
                const rawProp = pair.slice(0, colonIndex).trim();
                const value = pair.slice(colonIndex + 1).trim();
                if (rawProp && value) {
                    const prop = camelize(rawProp);
                    result[prop.startsWith("webkit") ? capitalize(prop) : prop] = value;
                }
            }
        }
        start = end + 1;
    }
    if (styleCache.size === STYLE_CACHE_LIMIT) {
        const oldestKey = styleCache.keys().next().value;
        if (oldestKey) {
            styleCache.delete(oldestKey);
        }
    }
    styleCache.set(style, result);
    return result;
}
function convert(createElement, element) {
    let extraProps = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (typeof element === "string") {
        return element;
    }
    const children = (element.children || []).map((child)=>{
        return convert(createElement, child);
    });
    const elementAttributes = element.attributes || {};
    const attrs = {};
    for (const [key, val] of Object.entries(elementAttributes)){
        switch(true){
            case key === "class":
                {
                    attrs.className = val;
                    delete elementAttributes.class;
                    break;
                }
            case key === "style":
                {
                    attrs.style = styleToObject(String(val));
                    break;
                }
            case key.startsWith("aria-"):
            case key.startsWith("data-"):
                {
                    attrs[key.toLowerCase()] = val;
                    break;
                }
            default:
                {
                    attrs[camelize(key)] = val;
                }
        }
    }
    const { style: existingStyle, "aria-label": ariaLabel, ...remaining } = extraProps;
    if (existingStyle) {
        attrs.style = attrs.style ? {
            ...attrs.style,
            ...existingStyle
        } : existingStyle;
    }
    if (ariaLabel) {
        attrs["aria-label"] = ariaLabel;
        attrs["aria-hidden"] = "false";
    }
    return createElement(element.tag, {
        ...remaining,
        ...attrs
    }, ...children);
}
var useAccessibilityId = (id, hasAccessibleProps)=>{
    const generatedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    return id || (hasAccessibleProps ? generatedId : void 0);
};
// src/logger.ts
var Logger = class {
    /**
   * Logs messages to the console if not in production.
   * @param args - The message and/or data to log.
   */ log() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        if (!this.enabled) return;
        console.log("[".concat(this.scope, "]"), ...args);
    }
    /**
   * Logs warnings to the console if not in production.
   * @param args - The warning message and/or data to log.
   */ warn() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        if (!this.enabled) return;
        console.warn("[".concat(this.scope, "]"), ...args);
    }
    /**
   * Logs errors to the console if not in production.
   * @param args - The error message and/or data to log.
   */ error() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        if (!this.enabled) return;
        console.error("[".concat(this.scope, "]"), ...args);
    }
    constructor(scope = "react-fontawesome"){
        this.enabled = false;
        let IS_DEV = false;
        try {
            IS_DEV = typeof __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && ("TURBOPACK compile-time value", "development") === "development";
        } catch (e) {}
        this.scope = scope;
        this.enabled = IS_DEV;
    }
};
typeof __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.FA_VERSION || "7.0.0";
var SVG_CORE_VERSION = "searchPseudoElementsFullScan" in __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f40$fortawesome$2f$fontawesome$2d$svg$2d$core$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"] ? "7.0.0" : "6.0.0";
var IS_VERSION_7_OR_LATER = Number.parseInt(SVG_CORE_VERSION) >= 7;
var ANIMATION_CLASSES = {
    beat: "fa-beat",
    fade: "fa-fade",
    beatFade: "fa-beat-fade",
    bounce: "fa-bounce",
    shake: "fa-shake",
    spin: "fa-spin",
    spinPulse: "fa-spin-pulse",
    spinReverse: "fa-spin-reverse",
    pulse: "fa-pulse"
};
var PULL_CLASSES = {
    left: "fa-pull-left",
    right: "fa-pull-right"
};
var ROTATE_CLASSES = {
    "90": "fa-rotate-90",
    "180": "fa-rotate-180",
    "270": "fa-rotate-270"
};
var SIZE_CLASSES = {
    "2xs": "fa-2xs",
    xs: "fa-xs",
    sm: "fa-sm",
    lg: "fa-lg",
    xl: "fa-xl",
    "2xl": "fa-2xl",
    "1x": "fa-1x",
    "2x": "fa-2x",
    "3x": "fa-3x",
    "4x": "fa-4x",
    "5x": "fa-5x",
    "6x": "fa-6x",
    "7x": "fa-7x",
    "8x": "fa-8x",
    "9x": "fa-9x",
    "10x": "fa-10x"
};
var STYLE_CLASSES = {
    border: "fa-border",
    /** @deprecated */ fixedWidth: "fa-fw",
    flip: "fa-flip",
    flipHorizontal: "fa-flip-horizontal",
    flipVertical: "fa-flip-vertical",
    inverse: "fa-inverse",
    rotateBy: "fa-rotate-by",
    swapOpacity: "fa-swap-opacity",
    widthAuto: "fa-width-auto"
};
// src/utils/get-class-list-from-props.ts
function getClassListFromProps(props) {
    const { beat, fade, beatFade, bounce, shake, spin, spinPulse, spinReverse, pulse, fixedWidth, inverse, border, flip, size, rotation, pull, swapOpacity, rotateBy, widthAuto, className } = props;
    const result = [];
    if (className) result.push(...className.split(" "));
    if (beat) result.push(ANIMATION_CLASSES.beat);
    if (fade) result.push(ANIMATION_CLASSES.fade);
    if (beatFade) result.push(ANIMATION_CLASSES.beatFade);
    if (bounce) result.push(ANIMATION_CLASSES.bounce);
    if (shake) result.push(ANIMATION_CLASSES.shake);
    if (spin) result.push(ANIMATION_CLASSES.spin);
    if (spinReverse) result.push(ANIMATION_CLASSES.spinReverse);
    if (spinPulse) result.push(ANIMATION_CLASSES.spinPulse);
    if (pulse) result.push(ANIMATION_CLASSES.pulse);
    if (fixedWidth) result.push(STYLE_CLASSES.fixedWidth);
    if (inverse) result.push(STYLE_CLASSES.inverse);
    if (border) result.push(STYLE_CLASSES.border);
    if (flip === true) result.push(STYLE_CLASSES.flip);
    if (flip === "horizontal" || flip === "both") {
        result.push(STYLE_CLASSES.flipHorizontal);
    }
    if (flip === "vertical" || flip === "both") {
        result.push(STYLE_CLASSES.flipVertical);
    }
    if (size !== void 0 && size !== null) result.push(SIZE_CLASSES[size]);
    if (rotation !== void 0 && rotation !== null && rotation !== 0) {
        result.push(ROTATE_CLASSES[rotation]);
    }
    if (pull !== void 0 && pull !== null) result.push(PULL_CLASSES[pull]);
    if (swapOpacity) result.push(STYLE_CLASSES.swapOpacity);
    if (!IS_VERSION_7_OR_LATER) return result;
    if (rotateBy) result.push(STYLE_CLASSES.rotateBy);
    if (widthAuto) result.push(STYLE_CLASSES.widthAuto);
    return result;
}
var isIconDefinition = (icon)=>typeof icon === "object" && "icon" in icon && !!icon.icon;
function normalizeIconArgs(icon) {
    if (!icon) {
        return void 0;
    }
    if (isIconDefinition(icon)) {
        return icon;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f40$fortawesome$2f$fontawesome$2d$svg$2d$core$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parse"].icon(icon);
}
// src/utils/typed-object-keys.ts
function typedObjectKeys(obj) {
    return Object.keys(obj);
}
// src/components/FontAwesomeIcon.tsx
var logger = new Logger("FontAwesomeIcon");
var DEFAULT_PROPS = {
    border: false,
    className: "",
    mask: void 0,
    maskId: void 0,
    fixedWidth: false,
    inverse: false,
    flip: false,
    icon: void 0,
    listItem: false,
    pull: void 0,
    pulse: false,
    rotation: void 0,
    rotateBy: false,
    size: void 0,
    spin: false,
    spinPulse: false,
    spinReverse: false,
    beat: false,
    fade: false,
    beatFade: false,
    bounce: false,
    shake: false,
    symbol: false,
    title: "",
    titleId: void 0,
    transform: void 0,
    swapOpacity: false,
    widthAuto: false
};
var DEFAULT_PROP_KEYS = new Set(Object.keys(DEFAULT_PROPS));
var FontAwesomeIcon = __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].forwardRef((props, ref)=>{
    const allProps = {
        ...DEFAULT_PROPS,
        ...props
    };
    const { icon: iconArgs, mask: maskArgs, symbol, title, titleId: titleIdFromProps, maskId: maskIdFromProps, transform } = allProps;
    const maskId = useAccessibilityId(maskIdFromProps, Boolean(maskArgs));
    const titleId = useAccessibilityId(titleIdFromProps, Boolean(title));
    const iconLookup = normalizeIconArgs(iconArgs);
    if (!iconLookup) {
        logger.error("Icon lookup is undefined", iconArgs);
        return null;
    }
    const classList = getClassListFromProps(allProps);
    const transformProps = typeof transform === "string" ? __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f40$fortawesome$2f$fontawesome$2d$svg$2d$core$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parse"].transform(transform) : transform;
    const normalizedMaskArgs = normalizeIconArgs(maskArgs);
    const renderedIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f40$fortawesome$2f$fontawesome$2d$svg$2d$core$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["icon"])(iconLookup, {
        ...classList.length > 0 && {
            classes: classList
        },
        ...transformProps && {
            transform: transformProps
        },
        ...normalizedMaskArgs && {
            mask: normalizedMaskArgs
        },
        symbol,
        title,
        titleId,
        maskId
    });
    if (!renderedIcon) {
        logger.error("Could not find icon", iconLookup);
        return null;
    }
    const { abstract } = renderedIcon;
    const extraProps = {
        ref
    };
    for (const key of typedObjectKeys(allProps)){
        if (DEFAULT_PROP_KEYS.has(key)) {
            continue;
        }
        extraProps[key] = allProps[key];
    }
    return convertCurry(abstract[0], extraProps);
});
FontAwesomeIcon.displayName = "FontAwesomeIcon";
var convertCurry = convert.bind(null, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement);
;
}),
]);

//# sourceMappingURL=b7891_f78bde0c._.js.map