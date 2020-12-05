//@ts-check
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useFetch, useListDataPaginator } from "@/js/react/hooks"
import { useTranslation } from "react-i18next"
import { List } from "../Product/template/Sections"
import { LaravelPagination } from '@/js/react/components/Pagination'


const ShowList = ({ datas, url }) => {
    const { ApiRequest } = useFetch()
    const { t } = useTranslation()
    const [listData, setListData] = useListDataPaginator(datas)

    const getDataPaginator = useCallback(({ page }) => {
        if (!listData.meta || listData.meta.current_page == page) return
        ApiRequest('get', url + '?page=' + page)
            .then(({ data }) => setListData(data))
    }, [listData, url, setListData])

    return <>
        <LaravelPagination listData={listData} getDataPaginator={getDataPaginator} />
        <List.Ul>
            <List.Li data={listData.data || []}>
                {v => (
                    <div className="row mb-1">
                        <div className="col">
                            <h4 className="mb-1">
                                {v.guest.name} <br />
                                {!!v.guest.email && <><small>{t('Email')}: {v.guest.email}</small><br /></>}
                                {!!v.guest.phone && <small>{t('Phone')}: {v.guest.phone}</small>}
                            </h4>
                            <hr className="py-1 my-1" />
                            {v.validator && (
                                <h4 className="mb-1">
                                    <small><b>{t('Validé par')}</b>: </small><br />
                                    <small>{v.validator.name}</small><br />
                                    <small>{v.validator.phone}</small><br />
                                    <small><b>{t('Validé à')}</b>: {v.created_at}</small>
                                </h4>
                            )}
                        </div>
                    </div>
                )}
            </List.Li>
        </List.Ul>
    </>
}


export const ReportList = ({ setLoading, url }) => {
    const { t } = useTranslation()
    /** @type {any} datas  */
    const [datas, setDatas] = useState({})
    const { ApiRequest } = useFetch()

    useEffect(() => {
        setLoading(true)
        ApiRequest('get', url, {}, true)
            .finally(() => setLoading(false))
            .then(({ data }) => setDatas(data))
    }, [])

    return <>
        {datas.meta && (
            <h4 className="my-4">{t('Total')} <b>{datas.meta.total}</b></h4>
        )}
        <ShowList datas={datas} url={url} />
    </>
}