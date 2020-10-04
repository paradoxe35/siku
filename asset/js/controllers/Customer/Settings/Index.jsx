//@ts-check
import React, { Fragment, useCallback } from 'react'
import { useTranslation } from "react-i18next";
import { InitReact } from '@/js/react/init';
import Datetime from '@/js/react/components/Datetime';
import { DefaultButton } from '@/js/react/components/Buttons';
import { Notifier } from '@/js/functions/notifier';
import { Localize } from '@/js/functions/localize';
import { URLS } from '@/js/react/vars';
import { useFetch } from '@/js/react/hooks';
import { useDispatch } from 'react-redux';
import { setCurrentEvent } from '@/js/store/features/EventSlice';
import { useSelector } from 'react-redux';
import { TurbolinksApp } from '@/js/modules/turbolinks';


const CustomerSettings = () => {
    const { t } = useTranslation()
    const { fetchAPi, fetchLoading: loading } = useFetch()
    const dispatch = useDispatch()
    /**
     * @type { { name:string, is_public: boolean, event_date:string } }
     */
    // @ts-ignore
    const { name, is_public, event_date } = useSelector(s => s.workingEvent)

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        // @ts-ignore
        const form = new FormData(e.target)
        fetchAPi('put', URLS.eventUpdate, form, true)
            .then(({ data }) => {
                dispatch(setCurrentEvent(data))
                Notifier.sussess(Localize({
                    fr: 'Modifications enregistrées',
                    en: 'Saved changes'
                }))
                TurbolinksApp.isc.visit(URLS.eventSettingsRoute, { action: 'replace' })
            })
    }, [])
    return <>
        <h5 className="my-4">{t('Modifier')}</h5>
        <div className="row">
            <div className="col-lg-6">
                <form method="post" onSubmit={handleSubmit} autoComplete="off">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <div className="input-group input-group-merge">
                                    <input className="form-control" defaultValue={name} name="event_name" autoFocus={true}
                                        placeholder={t('Nom D\'événement')} type="text" required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <Datetime locale='fr'
                                    dateFormat="YYYY-MM-DD"
                                    defaultValue={event_date}
                                    inputProps={{
                                        placeholder: t("Date d'événement"),
                                        className: "form-control", name: "event_date", required: true
                                    }} />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" defaultChecked={is_public} name="is_public" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label text-muted" htmlFor="customCheck1">
                                    {t('Public')}
                                </label>
                            </div>
                        </div>
                    </div>
                    <DefaultButton label={t('Enregistrer les modifications')} loading={loading} type="submit" />
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
