//@ts-check
import { BtnGroupTab } from '@/js/react/components/BtnGroupTab';
import { Loader } from '@/js/react/components/Loader';
import { LaravelPagination } from '@/js/react/components/Pagination';
import { useFetch, useListDataPaginator } from '@/js/react/hooks';
import React, { Fragment, useCallback, useRef } from 'react'
import { useTranslation } from "react-i18next";

export const ListDatasByFilter = ({ children, url, tabs = null, selectedTab = null }) => {
    const { t } = useTranslation()
    const { fetchAPi, fetchLoading } = useFetch()
    const [listData, setListData, getDataPaginator] = useListDataPaginator(null, onPageChange)
    const filter = useRef(null)


    const callback = useCallback((v) => {
        fetchAPi('get', url + '?filter=' + v, {}, true)
            .finally(() => {
                setListData({})
                filter.current = v
            })
            .then(({ data }) => setListData(data))

    }, [filter.current])

    function onPageChange(page) {
        fetchAPi('get', url + '?page=' + page + '&filter=' + filter.current, {}, true)
            .then(({ data }) => setListData(data))
    }

    const deleted = (id) => {
        setListData(d => {
            const t = { ...d }
            t.data = d.data.filter(r => r.id !== id)
            return t
        })
    }

    const added = (item) => {
        setListData(d => {
            const t = { ...d }
            t.data = [item, ...d.data]
            return t
        })
    }

    const updated = (item) => {
        setListData(d => {
            const t = { ...d }
            t.data = d.data.map(r => r.id == item.id ? item : r)
            return t
        })
    }

    const modified = { updated, deleted, added }

    return <>
        <div className="mb-3">
            <BtnGroupTab
                tabs={tabs || [{ key: 'active', name: t('Actifs') }, { key: 'trash', name: t('Corbeille') }]}
                selected={callback}
                defaultv={selectedTab || 'active'} />
        </div>
        <Loader loading={fetchLoading}>
            <div className="table-responsive">{children(listData, filter.current, modified)}</div>
        </Loader>
        <div className="my-2">
            <LaravelPagination listData={listData} getDataPaginator={getDataPaginator} />
        </div>
    </>
}