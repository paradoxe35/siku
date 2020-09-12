//@ts-check
import React, { Fragment, lazy } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { useTranslation } from "react-i18next";
import { setURLS, setLang } from '@/js/react/vars';
import ReduxProvider from '@/js/react/components/ReduxProvider';
import RouteTabs from '@/js/react/components/RouteTabs';
import '@lib/sms/sms_counter';
import { i18nReactInit } from '@/js/react/i18n';


const Guests = lazy(() => import('./guests/Guests'))
const Templates = lazy(() => import('./template/Templates'))
const Historical = lazy(() => import('./historical/Historical'))
const Qrcode = lazy(() => import('./qrcode/Qrcode'))

const CustomerProduct = () => {
    const { t } = useTranslation();

    return <>
        <RouteTabs links={[
            {
                to: '/templates',
                name: t('Modèles')
            },
            {
                to: '/qr-code',
                name: t('Qr Code')
            },
            {
                to: '/guests',
                name: t('Invités et envoi')
            },
            {
                to: '/historical',
                name: t('Historique')
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
    i18nReactInit(locale)
    setURLS(urls)
    setLang(locale)
    render((
        <ReduxProvider>
            <CustomerProduct />
        </ReduxProvider>), element)
    return () => unmountComponentAtNode(element)
}