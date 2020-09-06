//@ts-check
import React, { Suspense, useRef, lazy } from 'react'
import { HashRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { FullLoader } from '@/js/react/components/FullLoader';

const NotFound = lazy(() => import('@/js/react/components/NotFound'))

/**
 * @param {{  links: Array.<{ to: string, name: string }>, 
 *  routes: Array.<{ component: JSX.Element, path: string }> }} param0 
 */
const RouteTabs = ({ links, routes }) => {
    const parentElemt = useRef(null)
    return <Router >
        <div className="nav-tabs--header">
            <ul className="nav nav-tabs custom-nav-tabs">
                {links.map((link, k) => {
                    return <li key={k.toString()} className="nav-item">
                        <NavLink replace={true} className="nav-link" activeClassName="active" to={link.to}>{link.name}</NavLink>
                    </li>
                })}
            </ul>
        </div>
        <div className="card shadow-sm" ref={parentElemt}>
            <div className="card-body mb-5">
                <Suspense fallback={<FullLoader parent={parentElemt.current} />}>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to={routes[0].path} />
                        </Route>
                        {routes.map((route, k) => {
                            return <Route key={k.toString()} path={route.path}>
                                {route.component}
                            </Route>
                        })}
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </Suspense>
            </div>
        </div>
    </Router>
}

export default RouteTabs