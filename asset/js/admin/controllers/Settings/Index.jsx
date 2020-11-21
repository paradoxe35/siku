//@ts-check
import React, { Fragment, lazy, useRef } from 'react'
import { useTranslation } from "react-i18next";
import { InitReact } from '@/js/react/init';
import RouteTabs from '@/js/react/components/RouteTabs';

const Profile = lazy(() => import('./profile/Profile'))
const Administrators = lazy(() => import('./Administrators/Administrators'))
const Agents = lazy(() => import('./Agents/Agents'))
const CompanyDetails = lazy(() => import('./CompanyDetails/CompanyDetails'))

const CustomerPayments = () => {
    const { t } = useTranslation();

    return <>
        <RouteTabs links={[
            {
                to: '/profile',
                name: t('Profil')
            },
            {
                to: '/administrators',
                name: t('Administrateurs')
            },
            {
                to: '/agents',
                name: t('Agents'),
            },
            {
                to: "/company-details",
                name: t("Détails de l'entreprise")
            }
        ]}
            routes={[
                {
                    component: <Profile />,
                    path: '/profile'
                },
                {
                    component: <Administrators />,
                    path: '/administrators'
                },
                {
                    component: <Agents />,
                    path: '/agents'
                },
                {
                    component: <CompanyDetails />,
                    path: '/company-details'
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
