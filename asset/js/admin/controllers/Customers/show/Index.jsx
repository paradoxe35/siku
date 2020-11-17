//@ts-check
import React, { Fragment, lazy, useRef } from 'react'
import { useTranslation } from "react-i18next";
import { InitReact } from '@/js/react/init';
import RouteTabs from '@/js/react/components/RouteTabs';

const Profile = lazy(() => import('./profile/Profile'))
const Events = lazy(() => import('./events/Events'))
const Purchases = lazy(() => import('./purchases/Purchases'))
const Alerts = lazy(() => import('./alerts/Alerts'))
const CustomPayments = lazy(() => import('./purchases/CustomPayments'))

const CustomerPayments = () => {
    const { t } = useTranslation();
    // @ts-ignore
    const { current: customer } = useRef(window.customer)

    return <>
        <RouteTabs links={[
            {
                to: '/profile',
                name: t('Profil')
            },
            {
                to: "/events",
                name: t('Événements') + ` ${customer.events_count}`
            },
            {
                to: '/purchases',
                name: t('Achats')
            },
            {
                to: 'custom-payments',
                name: t('Paiements personnalisés'),
            },
            {
                to: "/alerts",
                name: t("Alertes de solde faible") + ` (${customer.low_balance ? t('Activé') : t('Désactivé')})`
            }
        ]}
            routes={[
                {
                    component: <Profile />,
                    path: '/profile'
                },
                {
                    component: <CustomPayments />,
                    path: '/custom-payments'
                },
                {
                    component: <Events />,
                    path: '/events'
                },
                {
                    component: <Purchases />,
                    path: '/purchases'
                },
                {
                    component: <Alerts />,
                    path: '/alerts'
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
