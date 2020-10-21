//@ts-check
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { useFetch, useFullLoading, useItemDeletion } from '@/js/react/hooks';
import { useSelector } from 'react-redux';
import { DefaultButton } from '@/js/react/components/Buttons';
import { FormControl } from '@/js/react/components/FormControl';
import { SYMBOL } from '@/js/functions/functions';
import { FullLoader } from '@/js/react/components/FullLoader';
import { URLS } from '@/js/react/vars';
import ModalConfirm from '@/js/react/components/ModalConfirm';

const isInvalidNumber = (n) => isNaN(n) || !(+n > 0)

const ModifyBtn = ({ onClick }) => {
    const { t } = useTranslation()
    return <>
        <span className="p-1 ml-4 bg-secondary clickable-a d-inline-block" onClick={onClick}>
            <img src="/img/svg/icons8-edit.svg" height="15" width="15" alt={t('Editer')} />
        </span>
    </>
}


const SetLowBalance = ({ cancel, setDatas, datas }) => {
    // @ts-ignore
    const { email } = useSelector(s => s.userAuth)
    const { t } = useTranslation()
    const [amount, setAmount] = useState('')
    const [_datas, _setDatas] = useState(datas)
    const onCancel = useCallback(() => datas ? _setDatas(datas) : cancel(), [cancel, datas])
    const { fetchAPi, fetchLoading: loading } = useFetch()

    const onSave = useCallback(() => {
        if (isInvalidNumber(amount)) return
        fetchAPi('post', URLS.historyLowBalance, { amount: `${amount}` }, true)
            .then(({ data }) => {
                setDatas(data)
                _setDatas(data)
            })
    }, [amount, setDatas, _setDatas])

    const modify = <div className="card-body">
        <div className="form-group">
            <label htmlFor="amount" className="form-control-label text-sm">
                {t('Quand ma balance est en dessous')}
            </label>
            <div className="input-group input-group-merge">
                <div className="input-group-prepend">
                    <span className="input-group-text">{SYMBOL}</span>
                </div>
                <FormControl
                    autoComplete="off"
                    onChange={({ target: { value } }) => setAmount(value)}
                    className="form-control"
                    type="number"
                    value={amount}
                    id="amount"
                />
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="eemail" className="form-control-label text-sm">
                {t('Envoyer une alerte e-mail à')}
            </label>
            <FormControl
                className="form-control form-control-sm"
                disabled
                type="text"
                defaultValue={email}
                id="eemail" />
        </div>
        <div>
            <DefaultButton
                onClick={onCancel}
                color="secondary"
                textColor="text-default"
                label={t('Annuler')} />
            <DefaultButton
                onClick={onSave}
                disabled={isInvalidNumber(amount)}
                label={t('Enregistrer')}
                loading={loading} />
        </div>
    </div>

    const onModif = useCallback(() => {
        _setDatas(null)
        setAmount(r => datas ? datas.amount : r)
    }, [])

    const status = <div className="card-body">
        <p className="text-sm">
            {t('Quand ma balance est en dessous')} <b className="font-weight-600">{SYMBOL + (datas ? datas.amount : '')}</b>
            <ModifyBtn onClick={onModif} />
        </p>
        <p className="text-sm">
            {t('Envoyer une alerte e-mail à')} <b className="font-weight-600">{email}</b>
        </p>
    </div>


    return <div className="row mt-2">
        <div className="col-lg-5">
            <div className="card shadow-none border border-sm border-darken-1">
                {_datas ? status : modify}
            </div>
        </div>
    </div>
}

export default () => {
    const { t } = useTranslation()
    const { fetchAPi, fetchLoading: loading, ApiRequest } = useFetch(true)
    const [checked, setChecked] = useState(false)
    const [datas, setDatas] = useState(null)
    const { parentElemt } = useFullLoading()

    const {
        setDeletionLoading,
        closeModal,
        modalConfirm,
        handleDelete,
        deletionLoading
    } = useItemDeletion()

    useEffect(() => {
        fetchAPi('get', URLS.historyLowBalance, {}, true)
            .then(({ data, status }) => {
                if (status === 200) {
                    setDatas(data)
                    setChecked(true)
                }
            })
    }, [])

    const deleteItem = useCallback(() => {
        setDeletionLoading(true)
        ApiRequest('delete', URLS.historyLowBalance, {}, true)
            .finally(() => closeModal())
            .then(() => {
                setDatas(null)
                setChecked(false)
            })
    }, []);

    return <div ref={parentElemt}>
        {loading && <FullLoader parent={parentElemt.current} />}
        <div className="d-flex">
            <h4>{t('Activer les alertes de solde faible')} </h4>
            <label className="custom-toggle ml-2">
                <input type="checkbox" checked={checked} onChange={
                    ({ target: { checked: inputChecked } }) => {
                        if (!inputChecked && datas) {
                            handleDelete(datas.id)
                        } else {
                            setChecked(inputChecked)
                        }
                    }
                } />
                <span className="custom-toggle-slider rounded-circle"></span>
            </label>
        </div>
        <p className="text-muted text-sm">{t("Recevez un e-mail lorsque votre solde passe en dessous d'un seuil")}.</p>
        {checked && <SetLowBalance datas={datas} setDatas={setDatas} cancel={() => setChecked(false)} />}
        {!!datas && checked && (
            <ModalConfirm
                message={
                    (
                        <>
                            <h3 className="mb-2">{t('Désactiver les alertes de solde faible?')} </h3>
                            <p className="my-0">{t("Il est important de savoir quand votre solde est bas")}. {t("Si vous êtes à court de fonds, votre service peut être interrompu")}.</p>
                        </>
                    )
                }
                confirmText={t('Désactiver')}
                closeText={t('Annuler')}
                loading={deletionLoading}
                onConfirm={deleteItem}
                ref={modalConfirm} />
        )}
    </div>
}
