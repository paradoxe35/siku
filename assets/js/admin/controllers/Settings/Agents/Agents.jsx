//@ts-check
import { confirmed } from '@/js/functions/functions';
import { Notifier } from '@/js/functions/notifier';
import { ButtonWithLoader, DefaultButton } from '@/js/react/components/Buttons';
import CustomCheckbox from '@/js/react/components/CustomCheckbox';
import { InputField } from '@/js/react/components/InputField';
import { ListDatasByFilter } from '@/js/react/components/ListDatasByFilter';
import PhoneInput from '@/js/react/components/PhoneInput';
import { useFetch, usePhoneInput } from '@/js/react/hooks';
import { URLS } from '@/js/react/vars';
import React, { Fragment, useEffect, useRef } from 'react'
import { useTranslation } from "react-i18next";
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import { Init as initDropify } from '@js/utils/Dropify'
import Label from '@/js/react/components/Label';

const AddedAgentEvent = 'added-agent'

const DropDowBtn = ({ id, modified }) => {
    const { t } = useTranslation()

    const { fetchAPi, fetchLoading } = useFetch()

    const statusHanlder = (status) => {
        fetchAPi('patch', URLS.agentsIndex + '/' + id + '?status=' + status, {}, true)
            .then(({ data: { data } }) => modified.updated(data))
    }

    const deleteHandle = () => {
        if (!confirmed()) return
        fetchAPi('delete', URLS.agentsIndex + '/' + id, {}, true)
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
                <a onClick={() => statusHanlder('online')} className="dropdown-item clickable-a">
                    {t('En ligne')}
                </a>
                <a onClick={() => statusHanlder('offline')} className="dropdown-item clickable-a">
                    {t('Hors ligne')}
                </a>
                <div className="dropdown-divider"></div>
                <a onClick={deleteHandle} className="dropdown-item text-danger clickable-a">
                    {t('Supprimer définitivement')}
                </a>
            </div>
        </div>
    </>
}

const Agents = () => {
    const { t } = useTranslation()
    const ref = useRef(null)

    useEffect(() => {
        // @ts-ignore
        window.addEventListener(AddedAgentEvent, ({ detail }) =>
            ref.current && ref.current.added(detail)
        )
    }, [])

    return <>
        <ListDatasByFilter
            tabs={[]}
            selectedTab="all"
            url={URLS.agentsIndex}>
            {(listData, x, modified) => {
                ref.current = modified
                return <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">{t('Image')} </th>
                            <th scope="col">{t('ID')} </th>
                            <th scope="col">{t('Nom')} </th>
                            <th scope="col">{t('Email')}</th>
                            <th scope="col">{t('Phone')}</th>
                            <th scope="col">{t('Role')}</th>
                            <th scope="col">{t('Status')}</th>
                            <th scope="col">{t('Créé à')}</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(listData.data || []).map((agent) => (
                            <tr key={agent.id}>
                                <td>
                                    <span className="avatar rounded-circle mr-3">
                                        <img alt={agent.name} className="img-cover-full" src={agent.imageUrl} />
                                    </span>
                                </td>
                                <td>{agent.id}</td>
                                <td>{agent.name}</td>
                                <td>{agent.email}</td>
                                <td>{agent.phone}</td>
                                <td>{agent.role}</td>
                                <td>{agent.status}</td>
                                <td>{agent.created_at}</td>
                                <td><DropDowBtn id={agent.id} modified={modified} /></td>
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

    const { phone, onPhoneValueChange } = usePhoneInput()

    const { fetchAPi, fetchLoading } = useFetch()

    useEffect(() => {
        initDropify()
    }, [])

    const onSave = (e) => {
        e.preventDefault()
        const { target } = e

        if (!isValidPhoneNumber(phone)) return
        const parsed = parsePhoneNumber(phone)

        const form = new FormData(target)

        form.append('phone', parsed.number);

        fetchAPi('post', URLS.agentsStore, form, true)
            .then(({ data: { message, item } }) => {
                Notifier.success(message)
                window.dispatchEvent(new CustomEvent(AddedAgentEvent, { detail: item }))
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
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>{t('Téléphone')}</label>
                        <PhoneInput
                            value={phone}
                            className="form-control"
                            placeholder={t("Numéro de téléphone")}
                            onChange={onPhoneValueChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <InputField type="text" placeholder={t('Rôle')} name="role" defaultValue="agent" required>
                        {t('Rôle')}
                    </InputField>
                </div>
            </div>
            <div className="form-group">
                <label>{t('Image')}</label>
                <input type="file" className="dropify" accept="image/*"
                    data-allowed-file-extensions="jpg jepg png gif" name="image" data-max-file-size="5M" />
            </div>
            <div className="mb-2">
                <Label>{t('En ligne')} | {t('Hors ligne')}</Label>
                <CustomCheckbox
                    defaultChecked={true}
                    label={t('Status')} name="status" />
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
                <CreateAgents />
            </div>
            <div className="col-lg-6 mb-3">
                <Agents />
            </div>
        </div>
    </>
}
