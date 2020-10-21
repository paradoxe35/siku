//@ts-check
import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { EventContext } from '@js/react/contexts';
import { TurbolinksApp } from '@/js/modules/turbolinks';
import { URLS } from '@/js/react/vars';
import { useFetch } from '@/js/react/hooks';

const EProfil = () => {
    const { t } = useTranslation();
    const event = useContext(EventContext)
    // @ts-ignore
    const userAuth = useSelector(state => state.userAuth)

    return <div className="card">
        <div className="card-body">
            <div className="row justify-content-between align-items-center">
                <div className="col">
                    <span> {event.name || '--'} </span>
                </div>
                <div className="col-auto">
                    <span className={`badge badge-lg ${event.active ? 'badge-success' : 'badge-danger'}`}>
                        {t(event.active ? 'actif' : 'inactif')}
                    </span>
                </div>
            </div>
            <div className="my-4">
                <span className="h6 surtitle text-muted">
                    {t("Utilisateur")}
                </span>
                <div className="h4">@{userAuth.name || ' --'}</div>
            </div>
            <div className="my-4">
                <span className="h6 surtitle text-muted">
                    {t("Date d'événement")}
                </span>
                <div className="h4">{event.event_date || ' --'}</div>
            </div>
            <div className="row">
                <div className="col">
                    <span className="h6 surtitle text-muted">{t('Invités')}</span>
                    <span className="d-block h3 ">{(event.guests || 0)}</span>
                </div>
            </div>
        </div>
    </div>
}


const EStatus = ({ handleLoading }) => {
    const { t } = useTranslation();
    const [phones, setPhones] = useState([])
    const event = useContext(EventContext)
    const { ApiRequest } = useFetch()

    const goToHome = function () {
        TurbolinksApp.isc.visit(event.route)
    }
    const eventParam = `?event_id=${event.hash}`

    // @ts-ignore
    const { balance } = useSelector(state => state.customerBalance)

    const goToPaymentPage = () => {
        handleLoading(true)
        ApiRequest('get', URLS.paymentsLinkPage + eventParam)
            .finally(() => {
                handleLoading(false)
            })
            .then(({ data }) => {
                TurbolinksApp.isc.visit(data.link)
            })
    }

    useEffect(() => {
        ApiRequest('get', URLS.cmpDetails)
            .then(({ data }) => setPhones(data.phones))
    }, [])

    // @ts-ignore
    const price = (v) => ((v || 0) * event.guests).nround(3)

    return <div className="card">
        <div className="card-body">
            <div className="row justify-content-between">
                <div className="col">
                    <small className="mb-1">{t('Montant présumé par rapport au nombre de vos invités')}.</small>
                    <div className="mb-1">
                        {t("SMS")} <span className="text-sm font-weight-bold">
                            ${price(event.price.sms)}
                        </span>
                    </div>
                    <div className="mb-1">
                        {t("Whatsapp")} <span className="text-sm font-weight-bold">
                            ${price(event.price.whatsapp)}
                        </span>
                    </div>
                </div>
                <div className="col-auto">
                    <button type="button" onClick={goToHome} className="btn btn-sm btn-secondary">
                        {t('Continuer')}
                    </button>
                </div>
            </div>
            <hr className="m-0 p-0" />
            <div className="row">
                <div className="col">
                    <small className="">{t("Votre Balance(le montant prêt à l'usage)")}.</small>
                    <div className="mb-1">
                        {t("Balance")} <span className="text-sm font-weight-bold">
                            ${balance || 0}
                        </span>
                    </div>
                </div>
            </div>
            <hr className="my-3" />
            <button className="btn btn-sm btn-block  mt-3" onClick={goToPaymentPage}>
                {t('Ajouter fonds')}
            </button>
        </div>
    </div>
}

const ConfirmAndCustomerStatus = ({ handleLoading }) => {
    return <>
        <div className="card-deck">
            <EStatus handleLoading={handleLoading} />
            <EProfil />
        </div>
    </>
}

export default ConfirmAndCustomerStatus