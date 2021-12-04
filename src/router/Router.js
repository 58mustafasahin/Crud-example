import React, { Suspense } from 'react'
import { useRoutes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import routes from './routes'

const Routes = () => {
    const elements = useRoutes(routes);
    return elements;
}

const Router = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes />
            </Suspense>
        </BrowserRouter>
    )
}

export default Router
