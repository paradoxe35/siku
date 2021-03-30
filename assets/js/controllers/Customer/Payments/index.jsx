//@ts-check
import React, { Fragment, lazy } from 'react'
import { useTranslation } from "react-i18next";
import { InitReact } from '@/js/react/init';
import RouteTabs from '@/js/react/components/RouteTabs';

const History = lazy(() => import('./history/History'))
const Alerts = lazy(() => import('./Alerts/Alerts'))

const CustomerPayments = () => {
    const { t } = useTranslation();

    return <>
        <RouteTabs links={[
            {
                to: '/history',
                name: t('Historique de paiement')
            },
            {
                to: "/alerts",
                name: t("Alertes de solde faible")
            }
        ]}
            routes={[
                {
                    component: <History />,
                    path: '/history'
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
