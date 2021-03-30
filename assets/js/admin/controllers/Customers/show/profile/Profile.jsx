//@ts-check
import { confirmed, SYMBOL } from '@/js/functions/functions';
import { Notifier } from '@/js/functions/notifier';
import { initSelect2 } from '@/js/functions/services';
import { DefaultButton } from '@/js/react/components/Buttons';
import { InputField } from '@/js/react/components/InputField';
import Status from '@/js/react/components/Status';
import { useFetch } from '@/js/react/hooks';
import { URLS } from '@/js/react/vars';
import React, { Fragment } from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";

const CLIENT_FORM = {
    name: 'name',
    country: {
        code: 'country_code',
        name: 'country_name'
    },
    pwd_confirm: 'password_confirmation',
    pwd: 'password'

}

const ProfileTable = ({ customer }) => {
    const { t } = useTranslation()

    return <>
        <div className="table-responsive">
            <table className="text-sm table table-borderless">
                <tbody>
                    <tr>
                        <th>{t('Evénements')}: </th>
                        <th>
                            <span className="ml-3">
                                {customer.events_count}
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th>{t('Evénements Inactifs')}: </th>
                        <th>
                            <span className="ml-3">
                                {customer.events_trashed}
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th>{t('Balance')}: </th>
                        <th>
                            <span className="ml-3">
                                {SYMBOL + customer.balance}
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th>{t('Consumé')}: </th>
                        <th>
                            <span className="ml-3">
                                {SYMBOL + customer.total_consumed}
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th>{t('Total Achat')}: </th>
                        <th>
                            <span className="ml-3">
                                {SYMBOL + customer.total_purchase}
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th>{t('Locale')}: </th>
                        <th>
                            <span className="ml-3">{customer.locale}</span>
                        </th>
                    </tr>
                    <tr>
                        <th>{t('Status')}: </th>
                        <th><span className="ml-3"><Status value={!customer.deleted} /></span></th>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
}

export default () => {
    const { t } = useTranslation()

    const selectRef = useRef(null)
    const country = useRef({ name: null, code: null })

    // @ts-ignore
    const [customer, setCustomer] = useState(window.customer)

    const { fetchAPi, fetchLoading } = useFetch()

    const { fetchAPi: fetchAPiDel, fetchLoading: fetchLoadingDel } = useFetch()

    const connectedCountry = (c) => {
        country.current = {
            name: c.name,
            code: c.code
        }
    }

    useEffect(() => {
        // @ts-ignore
        window.customer = customer
    }, [customer])

    useEffect(() => {
        let select = null;
        (async () => {
            select = await initSelect2(
                selectRef.current,
                connectedCountry,
                customer
            )
        })()
        return () => {
            select && select.destroy()
        }
    }, [])

    const onDelete = () => {
        if (!confirmed()) return
        fetchAPiDel('patch', URLS.update, {}, true)
            .then(({ data }) => {
                setCustomer(data.customer)
            })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const { target } = e
        const form = new FormData(target)

        form.append('country_code', country.current.code)
        form.append('country_name', country.current.name)

        fetchAPi('put', URLS.update, form, true)
            .then(({ data }) => {
                setCustomer(data.customer)
                Notifier.success(data.message)
                target.querySelectorAll("[type=password]")
                    .forEach((e) => (e.value = ''))
            })
    }

    return <>
        <div className="row">
            <div className="col-lg-6">
                <form method="post" onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="col-lg-6">
                            <InputField
                                type="text"
                                defaultValue={customer.name}
                                name={CLIENT_FORM.name}
                                placeholder={t('Nom')} />
                        </div>
                        <div className="col-lg-6">
                            <InputField
                                type="text"
                                defaultValue={customer.email}
                                placeholder={t('Email')} readOnly />
                        </div>
                    </div>
                    <div className="form-group">
                        <select className="text-sm w-100 mt-1" ref={selectRef} data-toggle="select" />
                    </div>
                    <div className="form-group">
                        <InputField
                            type="text"
                            readOnly
                            defaultValue={customer.phone}
                            placeholder={t('Téléphone')} />
                    </div>
                    <h4>{t('Changer le mot de passe')} </h4>

                    <div className="form-row">
                        <div className="col-lg-6">
                            <InputField
                                type="password"
                                name={CLIENT_FORM.pwd}
                                placeholder={t('Nouveau mot de passe')} />
                        </div>
                        <div className="col-lg-6">
                            <InputField
                                type="password"
                                name={CLIENT_FORM.pwd_confirm}
                                placeholder={t('Confirmer mot de passe')} />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <DefaultButton
                            loading={fetchLoading}
                            type="submit"
                            label={t('Enregistrer')} />
                        <DefaultButton
                            type="button"
                            onClick={onDelete}
                            loading={fetchLoadingDel}
                            label={t(customer.deleted ? 'Restorer' : 'Supprimer')}
                            color="secondary"
                            textColor={'text-' + (customer.deleted ? 'primary' : 'danger')} />
                    </div>
                </form>
            </div>
            <div className="col-lg-6">
                <ProfileTable customer={customer} />
            </div>
        </div>
    </>
}
