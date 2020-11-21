//@ts-check
import { confirmed } from '@/js/functions/functions';
import { Notifier } from '@/js/functions/notifier';
import { DefaultButton } from '@/js/react/components/Buttons';
import { InputField } from '@/js/react/components/InputField';
import { ListDatasByFilter } from '@/js/react/components/ListDatasByFilter';
import PhoneInput from '@/js/react/components/PhoneInput';
import { useFetch, usePhoneInput } from '@/js/react/hooks';
import { URLS } from '@/js/react/vars';
import React, { Fragment, useEffect, useRef } from 'react'
import { useTranslation } from "react-i18next";
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';

const AddedDetailEvent = 'added-cmp-detail'

const DropDowBtn = ({ id, modified }) => {
    const { t } = useTranslation()

    const { fetchAPi, fetchLoading } = useFetch()

    const deleteHandle = () => {
        if (!confirmed()) return
        fetchAPi('delete', URLS.cmpDetailsIndex + '/' + id, {}, true)
            .then(({ data }) => modified.deleted(data.id))
    }

    return <>
        <DefaultButton
            onClick={deleteHandle}
            color="secondary"
            textColor="text-danger"
            loading={fetchLoading}
            label={t('Supprimer')}
        />
    </>
}

const Agents = () => {
    const { t } = useTranslation()
    const ref = useRef(null)

    useEffect(() => {
        // @ts-ignore
        window.addEventListener(AddedDetailEvent, ({ detail }) =>
            ref.current && ref.current.added(detail)
        )
    }, [])

    return <>
        <ListDatasByFilter
            tabs={[]}
            selectedTab="all"
            url={URLS.cmpDetailsIndex}>
            {(listData, x, modified) => {
                ref.current = modified
                return <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">{t('ID')} </th>
                            <th scope="col">{t('Email Privé')} </th>
                            <th scope="col">{t('Email Public')}</th>
                            <th scope="col">{t('Téléphone Public')}</th>
                            <th scope="col">{t('Téléphone Privé')}</th>
                            <th scope="col">{t('Créé à')}</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(listData.data || []).map((detail) => (
                            <tr key={detail.id}>
                                <td>{detail.id}</td>
                                <td>{detail.private_email}</td>
                                <td>{detail.public_email}</td>
                                <td>{detail.public_phone}</td>
                                <td>{detail.private_phone}</td>
                                <td>{detail.created_at}</td>
                                <td><DropDowBtn id={detail.id} modified={modified} /></td>
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

const CreateAgents = () => {
    const { t } = useTranslation()

    const { phone: privatePhone, onPhoneValueChange: onPhonePrivateValueChange } = usePhoneInput()

    const { phone: publicPhone, onPhoneValueChange: onPhonePublicValueChange } = usePhoneInput()

    const { fetchAPi, fetchLoading } = useFetch()

    const onSave = (e) => {
        e.preventDefault()
        const { target } = e

        if (!isValidPhoneNumber(publicPhone) || !isValidPhoneNumber(privatePhone)) return

        const $privatePhone = parsePhoneNumber(privatePhone)
        const $publicPhone = parsePhoneNumber(publicPhone)

        const form = new FormData(target)

        form.append('private_phone', $privatePhone.number);
        form.append('public_phone', $publicPhone.number);

        fetchAPi('post', URLS.cmpDetailsStore, form, true)
            .then(({ data: { message, item } }) => {
                Notifier.success(message)
                window.dispatchEvent(new CustomEvent(AddedDetailEvent, { detail: item }))
                clearInput(target)
            })
    }

    return <>
        <form method="post" autoComplete="off" onSubmit={onSave}>
            <div className="row">
                <div className="col-lg-6">
                    <InputField type="email" name="private_email" required>{t('Email Privé')}</InputField>
                </div>
                <div className="col-lg-6">
                    <InputField type="email" name="public_email" required>{t('Email Public')} </InputField>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>{t('Téléphone Public')}</label>
                        <PhoneInput
                            value={publicPhone}
                            className="form-control"
                            onChange={onPhonePublicValueChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>{t('Téléphone Privé')}</label>
                        <PhoneInput
                            value={privatePhone}
                            className="form-control"
                            onChange={onPhonePrivateValueChange}
                        />
                    </div>
                </div>
            </div>
            <DefaultButton
                type="submit"
                loading={fetchLoading}
                label={t('Enregistrer')}
                disabled={!isValidPhoneNumber(privatePhone) || !isValidPhoneNumber(publicPhone)} />
        </form>
    </>
}

export default () => {
    return <>
        <div className="row">
            <div className="col-lg-6 mb-3">
                <CreateAgents />
            </div>
            <div className="col-lg-6 mb-3">
                <Agents />
            </div>
        </div>
    </>
}
