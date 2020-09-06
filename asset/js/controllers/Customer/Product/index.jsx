//@ts-check
import React, { Fragment, lazy } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { setURLS, setLang } from '@/js/react/vars';
import ReduxProvider from '@/js/react/components/ReduxProvider';
import RouteTabs from '@/js/react/components/RouteTabs';

const Guests = lazy(() => import('./guests/Guests'))
const Templates = lazy(() => import('./template/Templates'))
const Historical = lazy(() => import('./historical/Historical'))
const Qrcode = lazy(() => import('./qrcode/Qrcode'))
const Send = lazy(() => import('./send/Send'))

const CustomerProduct = () => {
    const { t } = useTranslation();

    return <>
        <RouteTabs links={[
            {
                to: '/guests',
                name: t('Invités')
            },
            {
                to: '/templates',
                name: t('Modèles')
            },
            {
                to: '/historical',
                name: t('Historique')
            },
            {
                to: '/qr-code',
                name: t('Qr Code')
            },
            {
                to: '/send-inv',
                name: t('Envoi')
            },
        ]}
            routes={[
                {
                    component: <Guests />,
                    path: '/guests'
                },
                {
                    component: <Templates />,
                    path: '/templates'
                },
                {
                    component: <Historical />,
                    path: '/historical'
                },
                {
                    component: <Send />,
                    path: '/send-inv'
                },
                {
                    component: <Qrcode />,
                    path: '/qr-code'
                }
            ]} />
    </>
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