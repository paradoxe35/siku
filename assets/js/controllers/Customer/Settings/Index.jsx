//@ts-check
import React, { Fragment, useCallback } from 'react'
import { useTranslation } from "react-i18next";
import { InitReact } from '@/js/react/init';
import Datetime from '@/js/react/components/Datetime';
import { DefaultButton } from '@/js/react/components/Buttons';
import { URLS } from '@/js/react/vars';
import { useFetch } from '@/js/react/hooks';
import { useDispatch } from 'react-redux';
import { setCurrentEvent } from '@/js/store/features/EventSlice';
import { useSelector } from 'react-redux';
import { InputField } from '@/js/react/components/InputField';
import CustomCheckbox from '@/js/react/components/CustomCheckbox';
import { savedChanges } from '@/js/functions/notifier';
import Cancel from '@/js/react/components/Cancel';


const CustomerSettings = () => {
    const { t } = useTranslation()
    const { fetchAPi, fetchLoading: loading } = useFetch()
    const dispatch = useDispatch()
    /**
     * @type { * }
     */
    // @ts-ignore
    const event = useSelector(s => s.workingEvent)

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        // @ts-ignore
        const form = new FormData(e.target)
        fetchAPi('put', URLS.eventUpdate, form, true)
            .then(({ data }) => {
                dispatch(setCurrentEvent(data))
                savedChanges()
            })
    }, [])
    return <>
        <h5 className="my-4">{t('Modifier')}</h5>
        <div className="row">
            <div className="col-lg-6">
                <form method="post" onSubmit={handleSubmit} autoComplete="off">
                    <div className="row">
                        <div className="col">
                            <InputField defaultValue={event.name} name="event_name" required>
                                {t("Nom d'événement")}
                            </InputField>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-control-label">{t("Temps de début")}</label>
                                <Datetime locale='fr'
                                    dateFormat="YYYY-MM-DD"
                                    initialValue={event.start_time}
                                    inputProps={{
                                        placeholder: t("Temps de début"),
                                        className: "form-control",
                                        name: "start_time",
                                        required: true
                                    }} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-control-label">{t("Temps de fin")}</label>
                                <Datetime locale='fr'
                                    dateFormat="YYYY-MM-DD"
                                    initialValue={event.end_time}
                                    inputProps={{
                                        placeholder: t("Temps de fin"),
                                        className: "form-control",
                                        name: "end_time",
                                        required: true
                                    }} />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <CustomCheckbox name="is_public" defaultChecked={event.is_public} label={t('Public')} />
                        </div>
                    </div>
                    <DefaultButton label={t('Enregistrer les modifications')} loading={loading} type="submit" />
                    <Cancel />
                </form>
            </div>
        </div>
    </>
}

/**
 * @param { HTMLElement|Element } element
 * @param { string } locale
 * @param { Object } urls
 */
export const init = (element, locale, urls = {}) =>
    InitReact(<CustomerSettings />, element, locale, urls);
