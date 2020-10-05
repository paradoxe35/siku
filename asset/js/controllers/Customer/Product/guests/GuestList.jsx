//@ts-check
import React, { useCallback, useEffect, useState } from 'react'
import Pagination from 'react-laravel-paginex/dist/Pagination'
import { useDispatch } from 'react-redux'
import { useItemDeletion, List, ListDescriptionText } from '../template/Sections'
import ModalConfirm from '@/js/react/components/ModalConfirm'
import { useFetch, useListDataPaginator } from '@/js/react/hooks'
import { Event_Guest, URLS, DispachGuestsDetail, DispachEventOpenGuestSocketDetail, TEMPLATE_SECTION } from '@/js/react/vars'
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

/**
 * 
 * @param {{  datas: any, setFullLoading: any, filter?:any, url: string  }} param0 
 */
export const GuestList = ({ datas, setFullLoading, filter, url }) => {
    const dispach = useDispatch()

    const [listData, setListData] = useListDataPaginator(datas)

    const onGuestUpdate = useCallback((e) => {
        const { detail } = e
        setListData(d => {
            const j = {...d}
            j.data = d.data.map(v => v.id == detail.id ? detail : v)
            return j
        })
    }, [setListData])

    useEffect(() => {
        window.addEventListener(Event_Guest, onGuestUpdate)
        return () => {
            window.removeEventListener(Event_Guest, onGuestUpdate)
        }
    }, [])

    const { ApiRequest } = useFetch()

    const getDataPaginator = useCallback(({ page }) => {
        if (!listData.meta || listData.meta.current_page == page) return
        setFullLoading(true)
        ApiRequest('get', url + '?page=' + page + '&' + filter)
            .finally(() => setFullLoading(false))
            .then(({ data }) => {
                setListData(data)
                DispachGuestsDetail(data)
            })
    }, [listData])

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
        {listData.meta && listData.meta.total >
            listData.meta.per_page && <Pagination
                buttonIcons={true}
                prevButtonIcon='ni ni-bold-left'
                nextButtonIcon='ni ni-bold-right'
                changePage={getDataPaginator}
                data={listData} />}
        <List.Ul>
            <List.Li data={listData.data || []}>
                {v => <ShowList v={v} handleDelete={handleDelete} />}
            </List.Li>
        </List.Ul>
        <ModalConfirm loading={deletionLoading} onConfirm={deleteItem} ref={modalConfirm} />
    </>
}
