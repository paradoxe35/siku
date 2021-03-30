//@ts-check
import { savedChanges } from '@/js/functions/notifier';
import { DefaultButton } from '@/js/react/components/Buttons';
import { InputField } from '@/js/react/components/InputField';
import PhoneInput from '@/js/react/components/PhoneInput';
import { useFetch, usePhoneInput } from '@/js/react/hooks';
import { URLS } from '@/js/react/vars';
import React, { Fragment } from 'react'
import { useTranslation } from "react-i18next";
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';


const Profile = () => {
    const { t } = useTranslation()
    // @ts-ignore
    const { email, name, phone: cphone } = window.admin;

    const { phone, onPhoneValueChange } = usePhoneInput(cphone)

    const { fetchAPi, fetchLoading } = useFetch()

    const onSave = (e) => {
        e.preventDefault()
        if (!isValidPhoneNumber(phone)) return

        const form = new FormData(e.target)

        form.set('phone', parsePhoneNumber(phone).number)

        fetchAPi('put', URLS.accountUpdate, form, true)
            .then(() => savedChanges())
    }

    return <form onSubmit={onSave}>
        <h3>{t('Profil')}</h3>
        <InputField type="text" name="name" placeholder={t('Nom')} defaultValue={name}>{t('Nom')}</InputField>
        <InputField type="email" name="email" placeholder={t('Email')} defaultValue={email}>{t('Email')}</InputField>

        <div className="form-group">
            <label>{t('Téléphone')}</label>
            <PhoneInput
                value={phone}
                className="form-control"
                placeholder={t("Numéro de téléphone")}
                onChange={onPhoneValueChange}
            />
        </div>
        <DefaultButton
            disabled={!isValidPhoneNumber(phone)}
            loading={fetchLoading}
            label={t('Enregistrer')}
            type="submit" />
    </form>
}

const PassWord = () => {
    const { t } = useTranslation()

    const { fetchAPi, fetchLoading } = useFetch()

    const onSave = (e) => {
        e.preventDefault()
        fetchAPi('put', URLS.accountUpdatePassword, new FormData(e.target), true)
            .then(() => savedChanges())
    }

    return <form onSubmit={onSave} autoComplete="off">
        <h3>{t('Mot de passe')}</h3>

        <InputField name="current_password" type="password" placeholder={t('Mot de passe existant')}>{t('Mot de passe existant')}</InputField>
        <InputField name="password" type="password" placeholder={t('Mot de passe')}>{t('Mot de passe')}</InputField>
        <InputField name="password_confirmation" type="password" placeholder={t('Confirmez le mot de passe')}>{t('Confirmez le mot de passe')}</InputField>

        <DefaultButton
            loading={fetchLoading}
            label={t('Changer mot de passe')}
            type="submit" />
    </form>
}

export default () => {
    const { t } = useTranslation()

    // @ts-ignore
    const { superAdmin, isAdmin } = window.admin;

    return <>
        {!!isAdmin && <span className="badge badge-default mr-2">{t('Admin')}</span>}
        {!!superAdmin && <span className="badge badge-success">{t('Super Admin')}</span>}
        <div className="row mt-3">
            <div className="col-lg-6 mb-4">
                <Profile />
            </div>
            <div className="col-lg-6">
                <PassWord />
            </div>
        </div>
    </>
}
