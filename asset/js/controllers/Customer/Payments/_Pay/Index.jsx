//@ts-check
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next";
import { InitReact } from '@/js/react/init';
import { isInvalideGuestFieldValue, URLS } from '@/js/react/vars';
import { useFetch } from '@/js/react/hooks';
import { DefaultButton } from '@/js/react/components/Buttons';
import { setBalanceAmount } from '@/js/store/features/BalanceSlice';
import { useDispatch } from 'react-redux';
import Label from '@/js/react/components/Label';
import { Card } from '@/js/react/components/Card';
import { ApiRequest } from '@/js/api/api';
import { Notifier } from '@/js/functions/notifier';
import { TurbolinksApp } from '@/js/modules/turbolinks';
import { SYMBOL } from '@/js/functions/functions';
import { Chat } from '../../App/chat/Chat';


const isValidPayData = (amount, guests) => amount > 0 && !isInvalideGuestFieldValue(guests)

const success = `Votre Paiement a bien été approuvé avec succès`

const ValidateCustomPayment = ({ amount, guests }) => {
    const { t } = useTranslation();

    const inputField = useRef(null)
    //redux store dispacher
    const dispache = useDispatch()

    const [phones, setPhones] = useState([])

    const { fetchAPi, fetchLoading: loading, ApiRequest } = useFetch()

    useEffect(() => {
        ApiRequest('get', URLS.cmpDetails)
            .then(({ data }) => setPhones(data.phones))
    }, [])

    const handleValidation =/** @param { React.FormEvent<HTMLFormElement> } e */  (e) => {
        e.preventDefault()
        // @ts-ignore
        const form = new FormData(e.target)
        form.append('amount', amount)
        form.append('guests', guests)
        fetchAPi('post', URLS.customPaymentValidate, form, true)
            .then(({ data }) => {
                Notifier.success(t(success))
                    .then(() => TurbolinksApp.visit(URLS.paypalReturnUrl))
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
                <span className="text-default text-sm font-weight-600">{phones.join(', ')}</span>
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
            <DefaultButton disabled={!isValidPayData(amount, guests)} type="submit" label={t('Valider')} loading={loading} />
        </form>
    </>
}


const payPalOptions = (amount, guests, successMsg) => ({
    createOrder: (data, actions) => {
        // This function sets up the details of the transaction, including the amount and line item details.
        return ApiRequest('post', URLS.paypalCreatePaypalTransaction, {
            amount: `${amount}`,
            return_url: URLS.paypalReturnUrl,
            cancel_url: URLS.paypalCancelUrl
        }, true)
            .then(({ data }) => data.id)
    },
    onApprove: (data) => {
        return ApiRequest('post', URLS.paypalGetPaypalTransaction, {
            orderID: data.orderID,
            guests: guests
        }, true)
            .then(({ data: dataResponse }) => {
                Notifier.success(successMsg, 5000)
                    .then(() => TurbolinksApp.visit(URLS.paypalReturnUrl))
            })
    }
})

const PayWithPayPal = ({ amount, guests }) => {
    const { t } = useTranslation()
    const payPaylEl = useRef(null)
    const connectPayPal = () => {
        // @ts-ignore
        window.paypal.Buttons(payPalOptions(amount, guests, t(success)))
            .render(payPaylEl.current)
    }

    useEffect(() => {
        const ppl = document.getElementById('paypay-script')
        // @ts-ignore
        if (window.paypal) {
            connectPayPal()
        } else {
            ppl.addEventListener('load', connectPayPal)
        }
    }, [])

    return <div ref={payPaylEl}></div>
}

const ValidateWithPayPal = ({ amount, guests }) => {
    const { t } = useTranslation();

    return <>
        <div className="mt-4 mb-2">
            <div className="text-muted mt-2 text-sm">
                <i className="ni ni-bold-right p-0 m-0"></i> {t("Complétez votre paiement avec PayPal")}.
            </div>
        </div>
        {isValidPayData(amount, guests) && <PayWithPayPal amount={amount} guests={guests} />}
    </>
}

const CustomerPay = () => {
    const { t } = useTranslation()
    // @ts-ignore
    const { current } = useRef(window.payData)
    const { guests, price } = current || {}

    return <>
        <div className="row">
            <div className="col-lg-6 mb-4">
                <ValidateCustomPayment guests={guests} amount={price} />
                <ValidateWithPayPal guests={guests} amount={price} />
            </div>
            <div className="col-lg-3 offset-lg-1">
                <Card header={<h4><b>{t('Résumé')}</b></h4>}>
                    <h4><span className="text-muted">{t('Montant à payer')}</span>: <b>{SYMBOL}{isNaN(price) ? 0 : price.nround(3)}</b> </h4>
                </Card>
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
    InitReact(<CustomerPay />, element, locale, urls);
