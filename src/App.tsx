import Loadable from "react-loadable";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";

const Cart = Loadable({
    loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
    loading: () => <div>Идёт загрузка корзины...</div>,
});

const FullPizza = React.lazy(
    () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);
const NotFound = React.lazy(
    () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

function App() {
    return (
        <Routes>
            <Route path="/pizza-delivery" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route
                    path="/pizza-delivery/cart"
                    element={
                        <Suspense
                            fallback={<div>Идёт загрузка корзины...</div>}
                        >
                            <Cart />
                        </Suspense>
                    }
                />
                <Route
                    path="pizza/:id"
                    element={
                        <Suspense fallback={<div>Идёт загрузка...</div>}>
                            <FullPizza />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<div>Идёт загрузка...</div>}>
                            <NotFound />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
