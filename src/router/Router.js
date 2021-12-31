import React, { Suspense } from 'react'
import { useRoutes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import MyFouter from '../components/MyFouter'
import MyNavbar from '../components/MyNavbar'
import routes from './routes'

const Routes = () => {
    const elements = useRoutes(routes);
    return elements;
}

const Router = () => {
    return (
        <BrowserRouter >
            <MyNavbar />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes />
            </Suspense>
            <MyFouter />
        </BrowserRouter>
    )
}

export default Router
