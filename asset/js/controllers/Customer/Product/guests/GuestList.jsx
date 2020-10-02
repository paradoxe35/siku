//@ts-check
import React, { useCallback, useEffect, useState } from 'react'
import Pagination from 'react-laravel-paginex/dist/Pagination'
import { useDispatch } from 'react-redux'
import { useItemDeletion, List, ListDescriptionText, TEMPLATE_SECTION } from '../template/Sections'
import ModalConfirm from '@/js/react/components/ModalConfirm'
import { useFetch } from '@/js/react/hooks'
import { Event_Guest, URLS, DispachGuestsDetail, DispachEventOpenGuestSocketDetail } from '@/js/react/vars'
import { putEventStatus } from '@/js/store/features/product/EventStatusSlice'
import { Notifier } from '@/js/functions/notifier'
import { DefaultButton } from '@/js/react/components/Buttons'
import { useTranslation } from 'react-i18next'



const ShowList = ({ v, handleDelete }) => {
    const { t } = useTranslation()

    const { fetchLoading: loading, fetchAPi } = useFetch()

    const sms = (v.can_send_sms ? [TEMPLATE_SECTION.sms] : [])
    const whatsapp = (v.can_send_whatsapp ? [TEMPLATE_SECTION.whatsapp] : [])

    const send = (v) => {
        fetchAPi('post', URLS.eventGuests + '/' + v.id + '/send', {}, true)
            .then((_res) => {
                Notifier.sussess(t('Envoi en cours...'))
                DispachEventOpenGuestSocketDetail(null)
            })
    }

    return <>
        <div className="d-flex w-100 justify-content-between mb-1" >
            <h4 className="mb-1">
                {v.name} <small>({v.phone})</small>
            </h4>
            <div onClick={e => e.stopPropagation()}>
                {
                    ((!!sms.length && !v.sended_sms) || (!!whatsapp.length && !v.sended_whatsapp)) &&
                    <DefaultButton
                        textColor="text-default"
                        onClick={() => send(v)}
                        loading={loading}
                        color="secondary"
                        label={t('Envoyer')} />
                }
            </div>
        </div>
        <div className="mb-2">
            {!!sms.length &&
                <div className="text-sm">
                    {t('SMS')}: {v.sended_sms ?
                        <span className="text-success">{t('Envoyé')}</span> :
                        t('Non Envoyé')}
                </div>}
            {!!whatsapp.length &&
                <div className="text-sm mt-1">
                    {t('WhatsApp')}: {v.sended_whatsapp ?
                        <span className="text-success">{t('Envoyé')}</span> :
                        t('Non Envoyé')}
                </div>}
        </div>
        <ListDescriptionText
            item={v}
            onDelete={handleDelete}
            canShown={[...sms, ...whatsapp]} />
    </>
}

export const GuestList = ({ datas, setFullLoading }) => {
    const [listData, setListData] = useState([])
    const dispach = useDispatch()

    useEffect(() => {
        setListData(datas.data || [])
    }, [datas.data])

    const onGuestUpdate = useCallback((e) => {
        const { detail } = e
        setListData(d => d.map(v => v.id == detail.id ? detail : v))
    }, [setListData])

    useEffect(() => {
        window.addEventListener(Event_Guest, onGuestUpdate)
        return () => {
            window.removeEventListener(Event_Guest, onGuestUpdate)
        }
    }, [])

    const { ApiRequest } = useFetch()

    const getDataPaginator = useCallback(({ page }) => {
        if (!datas.meta || datas.meta.current_page == page) return
        setFullLoading(true)
        ApiRequest('get', URLS.eventGuests + '?page=' + page)
            .finally(() => setFullLoading(false))
            .then(({ data }) => DispachGuestsDetail(data))
    }, [datas])

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
        ApiRequest('delete', URLS.eventGuests + '/' + deletionId, {}, true)
            .finally(() => closeModal())
            .then(({ data }) => {
                DispachGuestsDetail(data)
                dispach(putEventStatus({ saved_guests: data.meta.total }))
            })
    }, [deletionId]);

    return <>
        {datas.meta && datas.meta.total >
            datas.meta.per_page && <Pagination
                buttonIcons={true}
                prevButtonIcon='ni ni-bold-left'
                nextButtonIcon='ni ni-bold-right'
                changePage={getDataPaginator}
                data={datas} />}
        <List.Ul>
            <List.Li data={listData || []}>
                {v => <ShowList v={v} handleDelete={handleDelete} />}
            </List.Li>
        </List.Ul>
        <ModalConfirm loading={deletionLoading} onConfirm={deleteItem} ref={modalConfirm} />
    </>
}
