//@ts-check
import Status from '@/js/react/components/Status';
import { URLS } from '@/js/react/vars';
import React, { Fragment } from 'react'
import { useTranslation } from "react-i18next";
import { ListDatasByFilter } from '@js/react/components/ListDatasByFilter';


export default () => {
    const { t } = useTranslation()

    return <ListDatasByFilter url={URLS.events}>
        {listData => {
            return <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">{t('Id')} </th>
                        <th scope="col">{t('hash')} </th>
                        <th scope="col">{t('Nom')} </th>
                        <th scope="col">{t('Invités')} </th>
                        <th scope="col">{t("Date d'événement")}</th>
                        <th scope="col">{t('Créé à')}</th>
                        <th scope="col">{t('Status')}</th>
                    </tr>
                </thead>
                <tbody>
                    {(listData.data || []).map((event) => (
                        // @ts-ignore
                        <tr key={event.id} className="clickable-a" onClick={() => window.tvisit(event.route)}>
                            <td>{event.id}</td>
                            <td>{event.hash}</td>
                            <td>{event.name}</td>
                            <td>{event.guests}</td>
                            <td>{event.event_date}</td>
                            <td>{event.created_at}</td>
                            <td><Status value={!event.deleted_at} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        }}
    </ListDatasByFilter>
}