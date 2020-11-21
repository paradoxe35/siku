//@ts-check
import { confirmed } from '@/js/functions/functions';
import { Notifier } from '@/js/functions/notifier';
import { ButtonWithLoader, DefaultButton } from '@/js/react/components/Buttons';
import CustomCheckbox from '@/js/react/components/CustomCheckbox';
import { InputField } from '@/js/react/components/InputField';
import { ListDatasByFilter } from '@/js/react/components/ListDatasByFilter';
import PhoneInput from '@/js/react/components/PhoneInput';
import Status from '@/js/react/components/Status';
import { useFetch, usePhoneInput } from '@/js/react/hooks';
import { URLS } from '@/js/react/vars';
import React, { Fragment, useEffect, useRef } from 'react'
import { useTranslation } from "react-i18next";
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';

const AddedAdminEvent = 'added-admin'

const DropDowBtn = ({ id, trashed, modified }) => {
    const { t } = useTranslation()

    const { fetchAPi, fetchLoading } = useFetch()

    const trashHandle = () => {
        if (!confirmed()) return
        fetchAPi('delete', URLS.adminsIndex + '/' + id + '?trash=true', {}, true)
            .then(({ data: { data } }) => modified.updated(data))
    }

    const deleteHandle = () => {
        if (!confirmed()) return
        fetchAPi('delete', URLS.adminsIndex + '/' + id, {}, true)
            .then(({ data: { data } }) => modified.deleted(data.id))
    }

    return <>
        <div className="dropdown">
            <ButtonWithLoader type="button"
                className="btn btn-primary btn-sm dropdown-toggle"
                data-toggle="dropdown"
                // @ts-ignore
                loading={fetchLoading}
                aria-haspopup="true"
                label={t('Plus')}
                aria-expanded="false" />
            <div className="dropdown-menu shadow-lg">
                <a onClick={trashHandle} className="dropdown-item clickable-a">
                    {t(trashed ? 'Restaurer' : 'Corbeille')}
                </a>
                <div className="dropdown-divider"></div>
                <a onClick={deleteHandle} className="dropdown-item text-danger clickable-a">
                    {t('Supprimer définitivement')}
                </a>
            </div>
        </div>
    </>
}

const Admins = () => {
    const { t } = useTranslation()
    const ref = useRef(null)

    useEffect(() => {
        // @ts-ignore
        window.addEventListener(AddedAdminEvent, ({ detail }) =>
            ref.current && ref.current.added(detail)
        )
    }, [])

    return <>
        <ListDatasByFilter
            tabs={[
                { key: 'all', name: t('Tout') },
                { key: 'super', name: t('Super Admins') },
                { key: 'trashed', name: t('Corbeille') }
            ]}
            selectedTab="all"
            url={URLS.adminsIndex}>
            {(listData, x, modified) => {
                ref.current = modified
                return <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">{t('ID')} </th>
                            <th scope="col">{t('Nom')} </th>
                            <th scope="col">{t('Email')}</th>
                            <th scope="col">{t('Phone')}</th>
                            <th scope="col">{t('Créé à')}</th>
                            <th scope="col">{t('Super admin')}</th>
                            <th scope="col">{t('Status')}</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(listData.data || []).map((admin) => (
                            <tr key={admin.id}>
                                <td>{admin.id}</td>
                                <td>{admin.name}</td>
                                <td>{admin.email}</td>
                                <td>{admin.phone}</td>
                                <td>{admin.created_at}</td>
                                <td><Status value={admin.isSuperAdmin} /></td>
                                <td><Status value={!admin.trashed} /></td>
                                <td><DropDowBtn id={admin.id} trashed={admin.trashed} modified={modified} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            }}
        </ListDatasByFilter>
    </>
}

const clearInput = (p) => {
    Array.from(p.querySelectorAll('input'))
        .forEach((e) => (e.value = ''))
}

const CreateAdmin = () => {
    const { t } = useTranslation()

    const { phone, onPhoneValueChange } = usePhoneInput()

    const { fetchAPi, fetchLoading } = useFetch()

    const onSave = (e) => {
        e.preventDefault()
        const { target } = e

        if (!isValidPhoneNumber(phone)) return
        const parsed = parsePhoneNumber(phone)

        const form = new FormData(target)

        form.append('phone', parsed.number);
        form.append('country_name', parsed.country);
        form.append('country_code', parsed.country);

        fetchAPi('post', URLS.adminsStore, form, true)
            .then(({ data: { message, item } }) => {
                Notifier.success(message)
                window.dispatchEvent(new CustomEvent(AddedAdminEvent, { detail: item }))
                clearInput(target)
            })
    }

    return <>
        <form method="post" autoComplete="off" onSubmit={onSave}>
            <div className="row">
                <div className="col-lg-6">
                    <InputField type="text" name="name" required>{t('Nom')}</InputField>
                </div>
                <div className="col-lg-6">
                    <InputField type="email" name="email" required>{t('Email')} </InputField>
                </div>
            </div>
            <div className="form-group">
                <label>{t('Téléphone')}</label>
                <PhoneInput
                    value={phone}
                    className="form-control"
                    placeholder={t("Numéro de téléphone")}
                    onChange={onPhoneValueChange}
                />
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <InputField type="password" placeholder={t('Mot de passe')} name="password" required>
                        {t('Mot de passe')}
                    </InputField>
                </div>
                <div className="col-lg-6">
                    <InputField type="password" placeholder={t('Confirmez le mot de passe')} name="password_confirmation" required>
                        {t('Confirmez le mot de passe')}
                    </InputField>
                </div>
            </div>
            <div className="mb-2">
                <CustomCheckbox label={t('Super Admin')} name="super_admin" />
            </div>
            <DefaultButton
                type="submit"
                loading={fetchLoading}
                label={t('Enregistrer')}
                disabled={!isValidPhoneNumber(phone)} />
        </form>
    </>
}

export default () => {
    return <>
        <div className="row">
            <div className="col-lg-6 mb-3">
                <CreateAdmin />
            </div>
            <div className="col-lg-6 mb-3">
                <Admins />
            </div>
        </div>
    </>
}
