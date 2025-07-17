import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense } from "react";
import { CustomButton } from "./components/CustomButton/CustomButton";
const Products = React.lazy(() => import('products/ProductsApp'));
export default function App() {
    return (_jsxs("div", { children: [_jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsx(Products, {}) }), _jsx(CustomButton, { onClick: () => console.log('onClick') })] }));
}
;
