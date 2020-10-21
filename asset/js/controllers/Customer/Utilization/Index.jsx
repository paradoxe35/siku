//@ts-check
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from "react-i18next";
import { InitReact } from '@/js/react/init';
import { useFetch, usePhoneInput } from '@/js/react/hooks';
import { DefaultButton } from '@/js/react/components/Buttons';
import PhoneInput from '@/js/react/components/PhoneInput';
import CustomCheckbox from '@/js/react/components/CustomCheckbox';
import { useSelector } from 'react-redux';
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import { URLS } from '@/js/react/vars';
import { Empty } from '@/js/react/components/Empty';
import { List, useItemDeletion } from '../Product/template/Sections';
import ModalConfirm from '@/js/react/components/ModalConfirm';
import { SkeletonBox } from '@/js/react/components/SkeletonBox';


/**
 * @param {string} n 
 * @param {string} hash 
 */
const formatName = (n, hash) =>
    (n.split(' ').join('.') + '-' + hash).toLocaleLowerCase();


const validateName = (n = '') => {
    let h = 0;
    let narr = n.split('')
    while (h < n.length) {
        const k = n.length - (h + 1)
        const b = n.length - (h + 2)
        const z = n.length - h
        if (n[k] === '.') {
            if (narr[z] === undefined || narr[z] === '' || narr[z] === '-') {
                narr[k] = ''
            } else if (narr[b] === '.' || narr[b] === undefined) {
                narr[k] = '*'
            }
        }
        h++
    }
    return narr.filter(k => k !== '*').join('')
}


const SaveValidator = ({ updateValidatorsList }) => {
    const { t } = useTranslation();
    const { fetchAPi, fetchLoading: loading } = useFetch()
    const { phone, onPhoneValueChange } = usePhoneInput()
    const [name, setName] = useState('')
    // @ts-ignore
    const { hash } = useSelector(s => s.workingEvent)

    const validPhone = useMemo(() => {
        return isValidPhoneNumber(phone)
    }, [phone])

    const hasValidField = !validPhone || name.trim().length < 3

    const username = formatName(name, hash)

    const handleSubmit = (e) => {
        e.preventDefault()
        const fname = formatName(name.trim(), hash)
        const uname = validateName(fname)

        const dataPhone = parsePhoneNumber(phone)
        // @ts-ignore
        const form = new FormData(e.target)
        form.append('phone', dataPhone.number);
        form.append('country_code', dataPhone.country);
        form.append('country_call', dataPhone.countryCallingCode);
        form.append('username', uname);

        fetchAPi('post', URLS.eventValidatorsStore, form, true)
            .then(({ data: { data } }) => updateValidatorsList(data))
            .finally(() => {
                setName('')
                onPhoneValueChange('')
            })
    }

    return <form method="post" className="mb-5" onSubmit={handleSubmit} autoComplete="off">
        <div className="row">
            <div className="col">
                <div className="form-group">
                    <div className="input-group input-group-merge">
                        <input
                            className="form-control"
                            value={name}
                            onChange={({ target: { value } }) => setName(value)}
                            name="name"
                            placeholder={t("Nom d'utilisateur")} type="text" required />
                    </div>
                    <div className="text-xs mt-1 mb-2">
                        <b>{username}</b>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-10">
                <div className="form-group">
                    <div className="input-group input-group-merge">
                        <PhoneInput
                            value={phone}
                            className="form-control"
                            placeholder={t("Numéro de téléphone")}
                            onChange={onPhoneValueChange}
                        />
                    </div>
                    <div className="text-xs text-muted mt-3 mb-2">
                        {t("Ce numéro sera utilisé lors de l'envoi de la notification si bien sûr vous cochez la case ci-dessous")}.
                    </div>
                </div>

            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-10">
                <div className="send---case">
                    <CustomCheckbox name="can_notify" label={t('Notifier')} />
                    <div className="text-xs text-muted mt-1 mb-2">
                        {t("1 SMS vous sera facturé à l'envoi de la notification")}.
                    </div>
                </div>
            </div>
        </div>
        <DefaultButton label={t('Enregistrer')} disabled={hasValidField} loading={loading} type="submit" />
    </form>
}

const ShowList = ({ v, handleDelete }) => {
    const { t } = useTranslation()

    return <>
        <div className="row mb-1">
            <div className="col">
                <h4 className="mb-1">{v.username}</h4>
                <h4 className="mb-1">
                    <small>{v.name}</small><br/>
                    <small>{v.phone}</small>
                </h4>
            </div>
            <div className="col-auto">
                <div onClick={e => e.stopPropagation()}>
                    <DefaultButton
                        textColor="text-danger"
                        onClick={() => handleDelete(v.id)}
                        color="secondary"
                        label={t('Supprimer')} />
                </div>
            </div>
        </div>
    </>
}

const Validators = ({ datas = [], onItemDeletion }) => {

    const { ApiRequest } = useFetch()

    const {
        deletionId,
        setDeletionLoading,
        closeModal,
        modalConfirm,
        handleDelete,
        deletionLoading
    } = useItemDeletion()

    const deleteItem = useCallback(() => {
        if (!deletionId) return
        setDeletionLoading(true)
        ApiRequest('delete', URLS.eventValidators + '/' + deletionId, {}, true)
            .finally(() => closeModal())
            .then((_) => onItemDeletion(deletionId))
    }, [deletionId]);

    return <>
        <List.Ul>
            <List.Li data={datas}>
                {v => <ShowList v={v} handleDelete={handleDelete} />}
            </List.Li>
        </List.Ul>
        <ModalConfirm loading={deletionLoading} onConfirm={deleteItem} ref={modalConfirm} />
    </>
}

const CustomerUtilization = () => {
    const { t } = useTranslation()
    const [datas, setDatas] = useState([])
    const { fetchLoading: loading, fetchAPi } = useFetch(true)

    const updateValidatorsList = useCallback((data) => {
        setDatas(d => [data, ...d])
    }, [setDatas])


    useEffect(() => {
        fetchAPi('get', URLS.eventValidators)
            .then(({ data: { data } }) => setDatas(data))
    }, [])

    const onItemDeletion = useCallback((id) => {
        setDatas(d => d.filter(h => h.id != id))
    }, [setDatas])

    return <div className="row">
        <div className="col-lg-6">
            <SaveValidator updateValidatorsList={updateValidatorsList} />
        </div>
        <div className="col-lg-6">
            <Validators datas={datas} onItemDeletion={onItemDeletion} />
            {!loading && !datas.length && (
                <div className="mt-5">
                    <Empty message={t('Aucun utilisateur enregistré!')} />
                </div>
            )}
            {loading && <SkeletonBox height="50" lines="3" />}
        </div>
    </div>
}

/**
 * @param { HTMLElement|Element } element 
 * @param { string } locale 
 * @param { Object } urls 
 */
export const init = (element, locale, urls = {}) =>
    InitReact(<CustomerUtilization />, element, locale, urls);
