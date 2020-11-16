//@ts-check
import React, { Fragment, lazy, useRef } from 'react'
import { useTranslation } from "react-i18next";
import { InitReact } from '@/js/react/init';
import RouteTabs from '@/js/react/components/RouteTabs';

const Profile = lazy(() => import('./profile/Profile'))
const Templates = lazy(() => import('./templates/Templates'))
const Guests = lazy(() => import('./guests/Guests'))
const SendStatus = lazy(() => import('./send-status/SendStatus'))
const Validators = lazy(() => import('./validators/Validators'))

const CustomerPayments = () => {
    const { t } = useTranslation();
    // @ts-ignore
    const { current: event } = useRef(window._event)

    return <>
        <RouteTabs links={[
            {
                to: '/profile',
                name: t('Profil')
            },
            {
                to: "/templates",
                name: t('Modèles') + ` ${event.templates_count}`
            },
            {
                to: '/guests',
                name: t('Invités') + ` ${event.guests_count}`
            },
            {
                to: '/validators',
                name: t('Validateurs') + ` ${event.validators_count}`
            },
            {
                to: '/send-status',
                name: t("Statut d'envoi")
            },
        ]}
            routes={[
                {
                    component: <Profile />,
                    path: '/profile'
                },
                {
                    component: <Templates />,
                    path: '/templates'
                },
                {
                    component: <Validators />,
                    path: '/validators'
                },
                {
                    component: <Guests />,
                    path: '/guests'
                },
                {
                    component: <SendStatus />,
                    path: '/send-status'
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
    InitReact(<CustomerPayments />, element, locale, urls);
