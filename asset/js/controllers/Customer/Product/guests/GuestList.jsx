//@ts-check
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useItemDeletion, List, ListDescriptionText } from '../template/Sections'
import ModalConfirm from '@/js/react/components/ModalConfirm'
import { useFetch, useListDataPaginator } from '@/js/react/hooks'
import { Event_Guest, URLS, DispachGuestsDetail, DispachEventOpenGuestSocketDetail, TEMPLATE_SECTION, OverFlowStyle, onLoadedSocketLib, Event_Guests_Name } from '@/js/react/vars'
import { putEventStatus } from '@/js/store/features/product/EventStatusSlice'
import { Notifier } from '@/js/functions/notifier'
import { DefaultButton } from '@/js/react/components/Buttons'
import { useTranslation } from 'react-i18next'
import { LaravelPagination } from '@/js/react/components/Pagination'
import { Localize } from '@/js/functions/localize'


export const ShowListGuest = ({ v, handleDelete, canSend = true }) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const { fetchAPi } = useFetch()

    const sms = (v.can_send_sms ? [TEMPLATE_SECTION.sms] : [])
    const mail = (v.can_send_mail ? [TEMPLATE_SECTION.mail] : [])

    const send = async (v) => {
        setLoading(true)
        DispachEventOpenGuestSocketDetail(true)
        await onLoadedSocketLib()
        fetchAPi('post', URLS.eventGuests + '/' + v.id + '/send', {}, true)
            .finally(() => setLoading(false))
            .then((_res) => {
                Notifier.success(Localize({ fr: "Envoi en cours...", en: "Sending in progress..." }))
            })
    }

    const status = (value, failed) => {
        return value ?
            <span className="text-success">{t('Envoyé')}</span> :
            (failed ? <span className="text-danger">{t("Échec d'envoi")}</span> : t('Non Envoyé'))
    }

    return <>
        <div className="d-flex w-100 justify-content-between mb-1" >
            <h4 className="mb-1">
                {v.name} <small>({v.phone || v.email})</small>
                {v.email && v.phone && (
                    <>
                        <br />
                        <small>{t('Email')}: {v.email}</small>
                    </>
                )}
            </h4>
            {
                canSend &&
                (
                    <div onClick={e => e.stopPropagation()}>
                        {
                            ((!!sms.length && !v.sended_sms) || (!!mail.length && !v.sended_mail)) &&
                            <DefaultButton
                                textColor="text-default"
                                onClick={() => send(v)}
                                loading={loading}
                                color="secondary"
                                label={t('Envoyer')} />
                        }
                    </div>
                )
            }
        </div>
        <div className="mb-2">
            {
                !!sms.length &&
                <div className="text-sm">
                    {t('SMS')}: {status(v.sended_sms, v.failed)}
                </div>
            }
            {
                !!mail.length &&
                <div className="text-sm mt-1">
                    {t('Mail')}: {status(v.sended_mail, v.failed)}
                </div>
            }
        </div>
        <ListDescriptionText
            item={v}
            onDelete={handleDelete}
            canShown={[...sms, ...mail]} />
    </>
}

/**
 * 
 * @param {{  datas: any, setFullLoading: any, filter?:any, url: string, canSend?: boolean,canDelete?: boolean, datasFromParent?: boolean  }} param0 
 */
export const GuestList = ({ datas, setFullLoading, filter, url, canSend = true, canDelete = true, datasFromParent = false }) => {
    const dispach = useDispatch()

    const [listData, setListData] = useListDataPaginator(datas)

    const onGuestUpdate = useCallback((e) => {
        const { detail } = e
        setListData(d => {
            const j = { ...d }
            j.data = d.data.map(v => v.id == detail.id ? detail : v)
            return j
        })
    }, [setListData])

    const handleGuestList = useCallback((e) => {
        setListData(e.detail)
    }, [setListData])

    useEffect(() => {
        if (datasFromParent) return
        window.addEventListener(Event_Guests_Name, handleGuestList)
        return () => {
            window.removeEventListener(Event_Guests_Name, handleGuestList)
        }
    }, [])

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
        <LaravelPagination listData={listData} getDataPaginator={getDataPaginator} />
        <div style={OverFlowStyle}>
            <List.Ul>
                <List.Li data={listData.data || []}>
                    {v => <ShowListGuest v={v} canSend={canSend} handleDelete={canDelete ? handleDelete : null} />}
                </List.Li>
            </List.Ul>
        </div>
        <ModalConfirm loading={deletionLoading} onConfirm={deleteItem} ref={modalConfirm} />
    </>
}
