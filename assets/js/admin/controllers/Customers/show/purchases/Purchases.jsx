//@ts-check
import { SYMBOL } from '@/js/functions/functions';
import Status from '@/js/react/components/Status';
import { URLS } from '@/js/react/vars';
import React, { Fragment } from 'react'
import { useTranslation } from "react-i18next";
import { ListDatasByFilter } from '@js/react/components/ListDatasByFilter';


export default () => {
    const { t } = useTranslation()

    return <ListDatasByFilter
        tabs={[{ key: 'confirmed', name: t('Confirmé') }, { key: 'unconfirmed', name: t('Non Confirmé') }]}
        selectedTab="confirmed"
        url={URLS.purchases}>
        {listData => {
            return <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">{t('Id')} </th>
                        <th scope="col">{t('hash')} </th>
                        <th scope="col">{t('Créé à')}</th>
                        <th scope="col">{t('Méthode')}</th>
                        <th scope="col">{t('Confirmé')}</th>
                        <th scope="col">{t('Montant')}</th>
                    </tr>
                </thead>
                <tbody>
                    {(listData.data || []).map((purchase) => (
                        // @ts-ignore
                        <tr key={purchase.id} className="clickable-a" onClick={() => window.tvisit(purchase.route)}>
                            <td>{purchase.id}</td>
                            <td>{purchase.hash}</td>
                            <td>{purchase.created_at}</td>
                            <td>{purchase.payment_meta.service}</td>
                            <td><Status value={purchase.confirmed} /></td>
                            <td>{SYMBOL + purchase.payment_meta.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        }}
    </ListDatasByFilter>
}
