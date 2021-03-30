//@ts-check
import { confirmed, SYMBOL } from '@/js/functions/functions';
import { DefaultButton } from '@/js/react/components/Buttons';
import Status from '@/js/react/components/Status';
import { useFetch } from '@/js/react/hooks';
import { URLS } from '@/js/react/vars';
import React, { Fragment, useEffect } from 'react'
import { useState } from 'react';
import { useTranslation } from "react-i18next";


const ProfileTable = ({ event }) => {
    const { t } = useTranslation()

    return <>
        <div className="col-lg-6">
            <div className="table-responsive">
                <table className="text-sm table table-borderless">
                    <tbody>
                        <tr>
                            <th>{t("Id")} - {t('Hash')}: </th>
                            <th>
                                <span className="ml-3">
                                    {event.id} - {event.hash}
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <th>{t("Nom d'événement")}: </th>
                            <th>
                                <span className="ml-3">
                                    {event.name}
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <th>{t("Date d'événement")}: </th>
                            <th>
                                <span className="ml-3">
                                    {event.event_date_format}
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <th>{t("Créé à")}: </th>
                            <th>
                                <span className="ml-3">
                                    {event.created_at_format}
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <th>{t('Validateurs')}: </th>
                            <th>
                                <span className="ml-3">
                                    {event.validators_count}
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <th>{t("Status")}: </th>
                            <th>
                                <span className="ml-3">
                                    <Status value={!event.deleted_at} />
                                </span>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="col-lg-6">
            <div className="table-responsive">
                <table className="text-sm table table-borderless">
                    <tbody>
                        <tr>
                            <th>{t('Client Email')}: </th>
                            <th>
                                <span className="ml-3">
                                    <a href={event.customer_route}>
                                        {event.customer_email}
                                    </a>
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <th>{t('Invités')}: </th>
                            <th>
                                <span className="ml-3">
                                    {event.guests_count}
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <th>{t('Consumé')}: </th>
                            <th>
                                <span className="ml-3">
                                    {SYMBOL + event.status.consumed}
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <th>{t('Invitations Envoyées')}: </th>
                            <th>
                                <span className="ml-3">
                                    {event.status.processed}
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <th>{t("Description")}: </th>
                            <th>
                                <span className="ml-3">
                                    {event.description}
                                </span>
                            </th>
                        </tr>
                        {event.qrcode_logo && (
                            <tr>
                                <th>{t("QR Code Image")}: </th>
                                <th>
                                    <span className="ml-3">
                                        <a className="avatar">
                                            <img alt="Image placeholder" src={event.qrcode_logo} />
                                        </a>
                                    </span>
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default () => {
    const { t } = useTranslation()
    // @ts-ignore
    const [event, setEvent] = useState(window._event)

    const { fetchAPi, fetchLoading } = useFetch()

    useEffect(() => {
        // @ts-ignore
        window._event = event
    }, [event])

    const onDelete = () => {
        if (!confirmed()) return
        fetchAPi('patch', URLS.trash, {}, true)
            .then(({ data }) => {
                setEvent(data.event)
            })
    }

    return <>
        <div className="row">
            <ProfileTable event={event} />
        </div>
        <div className="row justify-content-between">
            <div className="col">
                <DefaultButton
                    type="button"
                    onClick={onDelete}
                    loading={fetchLoading}
                    label={t(!!event.deleted_at ? 'Restorer' : 'Supprimer')}
                    color="secondary"
                    textColor={'text-' + (!!event.deleted_at ? 'primary' : 'danger')} />
            </div>
        </div>
    </>
}
