//@ts-check
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next";
import { InitReact } from '@/js/react/init';
import { URLS } from '@/js/react/vars';
import { useFetch } from '@/js/react/hooks';
import { DefaultButton } from '@/js/react/components/Buttons';
import { setBalanceAmount } from '@/js/store/features/BalanceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceUse } from '../../Product/guests/ServiceUse';
import Label from '@/js/react/components/Label';


const ValidateCustomPayment = () => {
    const { t } = useTranslation();
    // @ts-ignore
    const { hash } = useSelector(r => r.workingEvent)
    const inputField = useRef(null)
    //redux store dispacher
    const dispache = useDispatch()

    const [phones, setPhones] = useState()

    const { fetchAPi, fetchLoading: loading, ApiRequest } = useFetch()

    useEffect(() => {
        ApiRequest('get', URLS.cmpDetails)
            .then(({ data }) => setPhones(data.phones))
    }, [])

    const handleValidation =/** @param { React.FormEvent<HTMLFormElement> } e */  (e) => {
        e.preventDefault()
        // @ts-ignore
        const form = new FormData(e.target)
        fetchAPi('post', `${URLS.customPaymentValidate}?event_id=${hash}`, form, true)
            .then(({ data }) => {
                // dispache new redux balance 
                data.confirmed && dispache(setBalanceAmount(data.new_balance))
                // reset payment field
                inputField.current && (inputField.current.value = '')
            })
    }
    return <>
        <div className="mb-2">
            <div className="text-muted mt-2 text-sm">
                <i className="ni ni-bold-right p-0 m-0"></i> {t("Contactez nous pour une autre méthode de paiement")}.
            </div>
            <div className="my-3">
                <span className="text-success text-sm font-weight-600">{phones}</span>
            </div>
        </div>
        <form method="post" onSubmit={handleValidation} autoComplete="off">
            <div className="form-group my-2">
                <Label>
                    {t('Apres avoir completer le paiement selon aux instructions qui vous seront données, Un code de validation de paiement vous sera envoyé')}
                </Label>
                <div className="input-group input-group-merge">
                    <input
                        className="form-control"
                        ref={inputField}
                        required
                        name="payment_code"
                        placeholder={t('Code paiement')}
                        type="text" />
                </div>
            </div>
            <DefaultButton type="submit" label={t('Valider')} loading={loading} />
        </form>
    </>
}

const ValidateWithPayPal = () => {
    const { t } = useTranslation();

    return <>
        <div className="mt-4 mb-2">
            <div className="text-muted mt-2 text-sm">
                <i className="ni ni-bold-right p-0 m-0"></i> {t("Completez votre paiement avec PayPal")}.
            </div>
        </div>
        <button className="btn btn-sm btn-secondary btn-block  mt-3">
            {t('Payer Avec')} PayPal
        </button>
    </>
}

const CustomerPaymentsNew = () => {
    const { t } = useTranslation()
    const { ApiRequest } = useFetch()
    const [services, setServices] = useState([])
    const [guests, setGuests] = useState('10')
    const [prices, setPrices] = useState({
        sms: 0,
        whatsapp: 0
    })
    const [showPrice, setShowPrice] = useState(0)

    // @ts-ignore
    const { country_name, country_code } = useSelector(r => r.userAuth)

    useEffect(() => {
        ApiRequest('get', URLS.countryPricing + '?country_code=' + country_code)
            .then(({ data: { prices: apiPrices } }) => {
                const g = { ...prices }
                Object.keys(apiPrices).forEach((k) => {
                    const p = apiPrices[k]
                    g[k] = p === null ? 0 : p
                })
                setPrices(g)
            })
    }, [])

    useEffect(() => {
        let price = 0
        services.forEach((v) => {
            if (prices[v] !== undefined) {
                price += (prices[v] * (isNaN(+guests) ? 0 : +guests))
            }
        })
        // @ts-ignore
        setShowPrice(price.nround(3))
    }, [services, prices, guests])

    const selectedServices = useCallback((s) => setServices(s), [setServices])

    return <>
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className="card border shadow-sm">
                    <h3 className="card-header text-center">{t('Invitations')}</h3>
                    <div className="card-body">
                        <div className="form-group">
                            <input
                                type="number"
                                autoFocus
                                value={guests}
                                onChange={({ target: { value } }) => {
                                    setGuests(value)
                                }}
                                onBlur={({ target: { value } }) => {
                                    const g = +value
                                    setGuests(r => (isNaN(g) || g < 10 || g > (10 ** 5) ? '10' : r))
                                }}
                                className="form-control"
                                placeholder={t("Nombre d'Invitations")} />
                        </div>
                        <ServiceUse onSelect={selectedServices} />
                        <Label>
                            {t('Le montant est calculé par rapport à votre pay')} ({country_name}), {" "}
                            {t('qui est le pay enregistré par default à votre compte utilisateur')}.
                        </Label>
                        <div className="mt-4">
                            <b className="text-lg">
                                {t('Montant')}: ${isNaN(showPrice) ? 0 : showPrice}
                            </b>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-lg-6">
                <h4 className="display-4 text-sm mb-3">
                    {t('Choisissez une méthode de paiement')}
                </h4>
                <ValidateCustomPayment />
                <ValidateWithPayPal />
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
    InitReact(<CustomerPaymentsNew />, element, locale, urls);
