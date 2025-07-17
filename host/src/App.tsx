import React, {Suspense} from "react";
import {CustomButton} from "./components/CustomButton/CustomButton";

const Products = React.lazy(() => import('products/ProductsApp'));

export default function App() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Products/>
            </Suspense>
            <CustomButton onClick={() => console.log('onClick')}/>
        </div>
    );
};