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
        tabs={[{ key: 'authorized', name: t('Autorisé') }, { key: 'unauthorized', name: t('Non Autorisé') }]}
        selectedTab="authorized"
        url={URLS.customPayments}>
        {listData => {
            return <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">{t('Id')} </th>
                        <th scope="col">{t('Code Paiement')} </th>
                        <th scope="col">{t('Montant')}</th>
                        <th scope="col">{t('Invités')}</th>
                        <th scope="col">{t('Créé à')}</th>
                        <th scope="col">{t('Chargé')}</th>
                    </tr>
                </thead>
                <tbody>
                    {(listData.data || []).map((purchase) => (
                        <tr key={purchase.id}>
                            <td>{purchase.id}</td>
                            <td>{purchase.payment_code}</td>
                            <td>{SYMBOL + purchase.amount}</td>
                            <td>{purchase.guests}</td>
                            <td>{purchase.created_at}</td>
                            <td>
                                <Status value={!!purchase.charged} />
                                {purchase.route && <a href={purchase.route}>{t('Profile')}</a>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        }}
    </ListDatasByFilter>
}
