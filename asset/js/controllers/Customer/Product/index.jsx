//@ts-check
import React, { Fragment, lazy } from 'react'
import { useTranslation } from "react-i18next";
import RouteTabs from '@/js/react/components/RouteTabs';

import '@lib/sms/sms_counter';
import { InitReact } from '@/js/react/init';


const Guests = lazy(() => import('./guests/Guests'))
const Templates = lazy(() => import('./template/Templates'))
const Profile = lazy(() => import('./profile/Profile'))
const Qrcode = lazy(() => import('./qrcode/Qrcode'))
const Common = lazy(() => import('./common/Common'))

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
                to: '/personalized-shipment',
                name: t('Envoi personnalisé')
            },
            {
                to: '/common-sending',
                name: t('Envoi commun')
            },
            {
                to: '/profile',
                name: t('Profile')
            },
        ]}
            routes={[
                {
                    component: <Guests />,
                    path: '/personalized-shipment'
                },
                {
                    component: <Common />,
                    path: '/common-sending'
                },
                {
                    component: <Templates />,
                    path: '/templates'
                },
                {
                    component: <Profile />,
                    path: '/profile'
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
export const init = (element, locale, urls = {}) =>
    InitReact(<CustomerProduct />, element, locale, urls);
