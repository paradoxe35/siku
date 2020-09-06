//@ts-check
import React, { lazy, Suspense, useRef } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { setURLS, setLang } from '@/js/react/vars';
import ReduxProvider from '@/js/react/components/ReduxProvider';
import { FullLoader } from '@/js/react/components/FullLoader';
import { NotFound } from '@/js/react/components/Empty';

// @ts-ignore
// const NotFound = lazy(() => import('@/js/react/components/Empty'))


const CustomerProduct = () => {
    const { t } = useTranslation();
    const parentElemt = useRef(null)


    return <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
            </ul>

            <hr />
            <div ref={parentElemt}>
                <Suspense fallback={<FullLoader parent={parentElemt.current} />}>
                    <Switch>
                        <Route exact path="/">
                            <div>home page</div>
                        </Route>
                        <Route path="/about">
                            <div>about page</div>
                        </Route>
                        <Route path="/dashboard">
                            <div>dashboard</div>
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </Suspense>
            </div>
        </div>
    </Router>
}

/**
 * 
 * @param { HTMLElement|Element } element 
 * @param { string } locale 
 * @param { Object } urls 
 */
export const init = (element, locale, urls = {}) => {
    i18n
        .use(initReactI18next)
        .init({
            resources: {
                en: {
                    translation: {}
                }
            },
            lng: locale,
            interpolation: {
                escapeValue: false
            }
        });
    setURLS(urls)
    setLang(locale)
    render((
        <ReduxProvider>
            <CustomerProduct />
        </ReduxProvider>), element)
    return () => unmountComponentAtNode(element)
}