//@ts-check
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next";
import { InitReact } from '@/js/react/init';
import { isInvalideGuestFieldValue, URLS } from '@/js/react/vars';
import { useFetch } from '@/js/react/hooks';
import { DefaultButton } from '@/js/react/components/Buttons';
import { useSelector } from 'react-redux';
import { ServiceUse } from '../../Product/guests/ServiceUse';
import Label from '@/js/react/components/Label';
import { TurbolinksApp } from '@/js/modules/turbolinks';
import { SYMBOL } from '@/js/functions/functions';

const GuestsField = ({ guests, onGuestFieldChange, onGuestFieldBlur, selectedServices, country_name }) => {
    const { t } = useTranslation()
    return <>
        <div className="form-group">
            <input
                type="number"
                value={guests}
                onChange={onGuestFieldChange}
                onBlur={onGuestFieldBlur}
                className="form-control"
                placeholder={t("Nombre d'Invitations")} />
        </div>
        <ServiceUse onSelect={selectedServices} />
        <Label>
            {t('Le montant est calculé par rapport à votre pay')} ({country_name}), {" "}
            {t('qui est le pay enregistré par default à votre compte utilisateur')}.
        </Label>
    </>
}

const CustomerPaymentsNew = () => {
    const DEFAULT_VALUE = '10'
    const { t } = useTranslation()

    const [services, setServices] = useState([])
    // @ts-ignore
    const { current } = useRef(window.payData)
    const { guests: guestsSaved } = current || {}

    const [guests, setGuests] = useState(guestsSaved || DEFAULT_VALUE)
    const [prices, setPrices] = useState({
        sms: 0,
        whatsapp: 0
    })
    const [showPrice, setShowPrice] = useState(0)

    // @ts-ignore
    const { country_name, country_code } = useSelector(r => r.userAuth)

    const { ApiRequest, fetchAPi, fetchLoading } = useFetch()

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
        setShowPrice(price)
    }, [services, prices, guests])

    const selectedServices = useCallback((s) => setServices(s), [setServices])

    const onGuestFieldChange = ({ target: { value } }) => {
        setGuests(value)
    }
    const onGuestFieldBlur = ({ target: { value } }) => {
        const g = +value
        setGuests(r => isInvalideGuestFieldValue(g) ? DEFAULT_VALUE : r)
    }

    const payDataHandle = useCallback(() => {
        fetchAPi('post', URLS.payData, { guests: guests, price: showPrice }, true, true)
            .then(({ data: { redirect_url } }) => {
                TurbolinksApp.visit(redirect_url)
            })
    }, [guests, showPrice])

    return <>
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className="card border shadow-sm">
                    <h3 className="card-header text-center">{t('Invitations')}</h3>
                    <div className="card-body">
                        <GuestsField
                            guests={guests}
                            onGuestFieldChange={onGuestFieldChange}
                            onGuestFieldBlur={onGuestFieldBlur}
                            selectedServices={selectedServices}
                            country_name={country_name} />
                        <div className="mt-4">
                            <b className="text-lg">
                                {/* @ts-ignore */}
                                {t('Montant')}: {SYMBOL}{(isNaN(showPrice) ? 0 : showPrice).nround(3)}
                            </b>
                        </div>
                    </div>
                </div>
                <DefaultButton
                    onClick={payDataHandle}
                    textColor={'p-2'}
                    label={t('Payez maintenant')}
                    loading={fetchLoading} />
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
