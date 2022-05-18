//@ts-check
import React, { useCallback, useState, useContext } from 'react'
import { useTranslation } from "react-i18next";
import { DefaultButton } from '@/js/react/components/Buttons';
import { EVENTS_VIEW, LANG, URLS } from '@/js/react/vars';
import { EventContext } from '@js/react/contexts';
import Datetime from '@/js/react/components/Datetime';
import { Notifier } from '@/js/functions/notifier';
import { Localize } from '@/js/functions/localize';
import { useFetch } from '@/js/react/hooks';
import { InputField } from '@/js/react/components/InputField';
import CustomCheckbox from '@/js/react/components/CustomCheckbox';


const CreateEvent = ({ updateComponentIndex, addEvent }) => {
    const { t } = useTranslation();
    const { updateEvent } = useContext(EventContext)

    const { fetchAPi, fetchLoading: loading } = useFetch()

    const newState = event => {
        addEvent(event)
        updateEvent(event)
        updateComponentIndex(EVENTS_VIEW.I_PROFILE_STATUS)
    }
    const handleSubmit = useCallback(/** @param { React.FormEvent<HTMLFormElement> } e */(e) => {
        e.preventDefault()
        // @ts-ignore
        const form = new FormData(e.target)
        fetchAPi('post', URLS.eventStore, form, true)
            .then(({ data }) => {
                if (data.data) {
                    Notifier.success(Localize({
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
                    <InputField
                        className="form-control form-control-sm"
                        placeholder={t("Nom d'événement")} name="event_name" required>
                        {t("Nom d'événement")}
                    </InputField>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-control-label">{t("Temps de début")}</label>
                        <Datetime locale={LANG}
                            dateFormat="YYYY-MM-DD"
                            initialValue={new Date()}
                            inputProps={{
                                placeholder: t("Temps de début"),
                                className: "form-control form-control-sm",
                                name: "start_time",
                                required: true
                            }} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-control-label">{t("Temps de fin")}</label>
                        <Datetime locale={LANG}
                            dateFormat="YYYY-MM-DD"
                            inputProps={{
                                placeholder: t("Temps de fin"),
                                className: "form-control form-control-sm",
                                name: "end_time",
                                required: true
                            }} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <InputField
                        type="number"
                        className="form-control form-control-sm"
                        placeholder={t("Nombre d'invité")}
                        name="event_guest" required>
                        {t("Nombre d'invité")}
                    </InputField>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        {t("Description")}
                        <div className="input-group input-group-merge">
                            <textarea
                                placeholder={t('(Optionnel)')}
                                name="description"
                                className="form-control form-control-sm"
                                rows={2} />
                        </div>
                    </div>
                </div>

            </div>
            <div className="row mb-3">
                <div className="col">
                    <CustomCheckbox name="is_public" label={t('Public')} />
                </div>
            </div>
            <DefaultButton label={t('Enregistrer')} loading={loading} type="submit" />
        </form>
    </>
}

export default CreateEvent
