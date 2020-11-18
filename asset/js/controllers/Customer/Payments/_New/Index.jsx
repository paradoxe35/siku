//@ts-check
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next";
import { InitReact } from '@/js/react/init';
import { DEFAULT_GUESTS_VALUE, isInvalideGuestFieldValue, URLS } from '@/js/react/vars';
import { useFetch } from '@/js/react/hooks';
import { DefaultButton } from '@/js/react/components/Buttons';
import { useSelector } from 'react-redux';
import { ServiceUse } from '../../Product/guests/ServiceUse';
import Label from '@/js/react/components/Label';
import { TurbolinksApp } from '@/js/modules/turbolinks';
import { debounce, SYMBOL } from '@/js/functions/functions';
import { Chat } from '../../App/chat/Chat';


const AmountField = ({ amount, onAmountFieldBlur, selectedServices, country_name }) => {
    const { t } = useTranslation()
    const [samount, setSAmount] = useState(amount)

    useEffect(() => {
        setSAmount(amount)
    }, [amount])

    return <>
        <div className="form-group">
            <input
                type="number"
                value={samount}
                onChange={({ target: { value } }) => setSAmount(value)}
                onBlur={onAmountFieldBlur}
                className="form-control"
                placeholder={t("Montant")} />
        </div>
        <ServiceUse allService={true} onSelect={selectedServices} />
        <Label>
            {t('Le montant est calculé par rapport à votre pays')} ({country_name}), {" "}
            {t('qui est le pays enregistré par défaut à votre compte utilisateur')}.
        </Label>
    </>
}

const CustomerPaymentsNew = () => {

    const { t } = useTranslation()

    const [services, setServices] = useState([])
    // @ts-ignore
    const { current } = useRef(window.payData)
    const { guests: guestsSaved } = current || {}

    const [guests, setGuests] = useState(guestsSaved || DEFAULT_GUESTS_VALUE)
    const [prices, setPrices] = useState({
        sms: 0,
        mail: 0
    })
    const [showPrice, setShowPrice] = useState(0)
    const priceTotal = useRef(0)

    // @ts-ignore
    const { country_name, country_code } = useSelector(r => r.userAuth)

    const { ApiRequest, fetchAPi, fetchLoading } = useFetch()

    useEffect(() => {
        priceTotal.current = Object.values(prices).reduce((a, b) => a + b, 0)
    }, [prices])

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

    const onAmountFieldBlur = ({ target: { value } }) => {
        const amount = +value
        const guest = Math.round(amount / priceTotal.current)
        setGuests(isInvalideGuestFieldValue(guest) ? DEFAULT_GUESTS_VALUE : guest)
    }

    const payDataHandle = useCallback(() => {
        fetchAPi('post', URLS.payData, { guests: guests, amount: showPrice }, true, true)
            .then(({ data: { redirect_url } }) => {
                TurbolinksApp.visit(redirect_url)
            })
    }, [guests, showPrice])

    // @ts-ignore
    const showP = (isNaN(showPrice) ? 0 : showPrice).nround(3)

    return <>
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className="card border shadow-sm">
                    <h3 className="card-header text-center">{t('Montant')}</h3>
                    <div className="card-body">
                        <AmountField
                            amount={showP}
                            onAmountFieldBlur={onAmountFieldBlur}
                            selectedServices={selectedServices}
                            country_name={country_name} />
                        <div className="mt-4">
                            <b className="text-lg">
                                {SYMBOL + showP}
                            </b>
                        </div>
                    </div>
                </div>
                <DefaultButton
                    onClick={debounce(payDataHandle, 100, false)}
                    textColor={'p-2'}
                    label={t('Payez maintenant')}
                    loading={fetchLoading} />
            </div>
        </div>
        <Chat />
    </>
}

/**
 * @param { HTMLElement|Element } element 
 * @param { string } locale 
 * @param { Object } urls 
 */
export const init = (element, locale, urls = {}) =>
    InitReact(<CustomerPaymentsNew />, element, locale, urls);
