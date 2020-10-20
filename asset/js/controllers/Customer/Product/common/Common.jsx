//@ts-check
import { Notifier } from '@/js/functions/notifier';
import { DefaultButton } from '@/js/react/components/Buttons';
import { Empty } from '@/js/react/components/Empty';
import { FullLoader } from '@/js/react/components/FullLoader';
import ModalConfirm from '@/js/react/components/ModalConfirm';
import RowDivider from '@/js/react/components/RowDivider';
import { useFetch, useFullLoading, useItemDeletion, usePhoneInput } from '@/js/react/hooks';
import { ASYNC, OverFlowStyle, URLS } from '@/js/react/vars';
import { commonGuestAdded, commonGuestRemoved, fetchCommonGuest } from '@/js/store/features/product/CommonGuestsSlice';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from "react-i18next";
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import { useDispatch, useSelector } from 'react-redux';
import { GuestField } from '../guests/GuestField';
import { List } from '../template/Sections';
import Help from './Help';

const GUEST_FORM = {
    name: 'name',
    phone: 'phone',
    email: 'email',
    country_code: 'country_code',
    country_call: 'country_call',
}

const CreateGuest = () => {
    const { t } = useTranslation();
    const { phone, onPhoneValueChange } = usePhoneInput()
    const dispach = useDispatch()

    const [fields, setFields] = useState({
        [GUEST_FORM.name]: '',
    })

    const { fetchLoading: loading, fetchAPi } = useFetch()

    const onChangeField = useCallback(
        /** @param {React.ChangeEvent<HTMLInputElement>} param0 */
        ({ target: { name, value } }) => {
            setFields(f => ({ ...f, [name]: value }))
        }, [setFields])

    const validField = useMemo(() => {
        return isValidPhoneNumber(phone) &&
            fields[GUEST_FORM.name].trim().length > 1
    }, [fields, phone])

    /**
   * @param { React.FormEvent<HTMLFormElement> } e 
   */
    const saveGuest = (e) => {
        e.preventDefault()
        if (!validField) return

        const { target } = e

        const dataPhone = parsePhoneNumber(phone)
        // @ts-ignore
        const form = new FormData(target)

        form.append(GUEST_FORM.phone, dataPhone.number);
        form.append(GUEST_FORM.country_code, dataPhone.country);
        form.append(GUEST_FORM.country_call, dataPhone.countryCallingCode);


        fetchAPi('post', URLS.commonGuestsStore, form, true)
            .then(({ data: { data } }) => {
                Notifier.sussess(t('Créé avec succès !'))
                dispach(commonGuestAdded(data))
                setFields(e => ({ ...e, [GUEST_FORM.name]: '' }))
                onPhoneValueChange('')
            })
    }

    return <>
        <form onSubmit={saveGuest} autoComplete="off" method="post">
            <GuestField
                onChangeField={onChangeField}
                form={GUEST_FORM}
                fields={fields}
                phone={phone}
                onPhoneValueChange={onPhoneValueChange} />
            <div className="mt-4">
                <DefaultButton
                    type="submit"
                    loading={loading}
                    disabled={!validField}
                    label={t('Enregistrer')} />
            </div>
        </form>
    </>
}


const ShowList = ({ v, handleDelete }) => {
    const { t } = useTranslation()

    return <>
        <div className="row mb-1">
            <div className="col">
                <h4 className="mb-1">{v.name}</h4>
                <h4 className="mb-1">
                    <small>{v.phone}</small><br />
                    <small>{v.email}</small>
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

const Guests = () => {
    const { ApiRequest } = useFetch()
    const { t } = useTranslation()

    // @ts-ignore
    const { ids, entities, loading } = useSelector(s => s.commonGuests)
    const dispach = useDispatch()
    useEffect(() => {
        // @ts-ignore
        dispach(fetchCommonGuest(URLS.commonGuests))
    }, [])

    const datas = ids.map(k => entities[k])

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
        ApiRequest('delete', URLS.commonGuests + '/' + deletionId, {}, true)
            .finally(() => closeModal())
            .then((_) => dispach(commonGuestRemoved(deletionId)))
    }, [deletionId]);

    const { parentElemt } = useFullLoading()


    return <>
        <div className="text-xs text-muted mt-3 mb-2">
            <b>{ids.length}</b> {t("Déjà enregistrés")}.
        </div>
        <div ref={parentElemt}>
            <div style={OverFlowStyle}>
                <List.Ul>
                    <List.Li data={datas}>
                        {v => <ShowList v={v} handleDelete={handleDelete} />}
                    </List.Li>
                </List.Ul>
            </div>
            <ModalConfirm loading={deletionLoading} onConfirm={deleteItem} ref={modalConfirm} />
            {loading == ASYNC.pending && <FullLoader parent={parentElemt.current} />}
            {
                loading == ASYNC.idle && !ids.length ? (
                    <div className="mt-5">
                        <Empty message={t('Aucun invité enregistré!')} />
                    </div>
                ) : ''
            }
        </div >
    </>
}

const Common = () => {
    return <div className="mb-9">
        <div className="row">
            <div className="col">
                <Help />
            </div>
        </div>
        <div className="row justify-content-start">
            <div className="col-lg-7">
                <RowDivider />
                <CreateGuest />
            </div>
            <div className="col-lg-5">
                <RowDivider />
                <Guests />
            </div>
        </div>
    </div>
}


export default Common