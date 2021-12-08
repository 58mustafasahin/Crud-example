import React from "react";

const Home = React.lazy(() => import("../pages/Home"))
const About = React.lazy(() => import("../pages/About"))
const Gallery = React.lazy(() => import("../pages/Gallery"))
const Category = React.lazy(() => import("../pages/Category"))
const Product = React.lazy(() => import("../pages/Product"))

const routes = [
    {
        path: '/About',
        element: <About />
    },
    {
        path: '/Gallery',
        element: <Gallery />
    },
    {
        path: '/Category',
        element: <Category />
    },
    {
        path: '/Product',
        element: <Product />
    },
    {
        path: '/',
        element: <Home />
    }
]

export default routes;