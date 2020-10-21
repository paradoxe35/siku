//@ts-check
import React, { useCallback, useState, useContext } from 'react'
import { useTranslation } from "react-i18next";
import { DefaultButton } from '@/js/react/components/Buttons';
import { I_PROFILE_STATUS, URLS, LANG } from '@/js/react/vars';
import { EventContext } from '@js/react/contexts';
import Datetime from '@/js/react/components/Datetime';
import { Notifier } from '@/js/functions/notifier';
import { Localize } from '@/js/functions/localize';
import { useFetch } from '@/js/react/hooks';


const CreateEvent = ({ updateComponentIndex, addEvent }) => {
    const { t } = useTranslation();
    const { updateEvent } = useContext(EventContext)

    const { fetchAPi, fetchLoading: loading } = useFetch()

    const newState = event => {
        addEvent(event)
        updateEvent(event)
        updateComponentIndex(I_PROFILE_STATUS)
    }
    const handleSubmit = useCallback(/** @param { React.FormEvent<HTMLFormElement> } e */(e) => {
        e.preventDefault()
        // @ts-ignore
        const form = new FormData(e.target)
        fetchAPi('post', URLS.eventStore, form, true)
            .then(({ data }) => {
                if (data.data) {
                    Notifier.sussess(Localize({
                        fr: 'Événement créé avec succès',
                        en: 'Event created successfully'
                    }))
                    newState(data.data)
                }
            })
    }, [])
    return <>
        <form method="post" onSubmit={handleSubmit} autoComplete="off">
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <input className="form-control form-control-muted" name="event_name"
                                placeholder={t("Nom D'événement")} type="text" required />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <Datetime locale='fr'
                            dateFormat="YYYY-MM-DD"
                            inputProps={{
                                placeholder: t("Date d'événement"),
                                className: "form-control form-control-muted", name: "event_date", required: true
                            }} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <input
                                className="form-control form-control-muted" name="event_guest"
                                placeholder={t("Nombre d'invité présumé")} type="number" required />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <textarea placeholder={t("Description") + t('(Optionnel)')} name="description" className="form-control form-control-muted"
                                rows={2}></textarea>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" defaultChecked={false} name="is_public" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label text-muted" htmlFor="customCheck1">
                            {t('Public')}
                        </label>
                    </div>
                </div>
            </div>
            <DefaultButton label={t('Enregistrer')} loading={loading} type="submit" />
        </form>
    </>
}

export default CreateEvent