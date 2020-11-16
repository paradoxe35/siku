//@ts-check
import React, { useCallback, useState, useMemo, useEffect, lazy, Suspense, Fragment, useRef } from 'react'
import { useTranslation } from "react-i18next";
import { FullLoader } from '@/js/react/components/FullLoader';
import { EVENTS_VIEW, EVENT_VALUE, URLS } from '@/js/react/vars';
import { EventContext } from '@js/react/contexts';
import { EventsList } from './EventsList';
import { useFetch, useFullLoading, useListDataPaginator } from '@/js/react/hooks';
import { InitReact } from '@/js/react/init';
import { LaravelPagination } from '@/js/react/components/Pagination';

const CreateEvent = lazy(() => import('./CreateEvent'))
const ConfirmAndCustomerStatus = lazy(() => import('./ConfirmAndCustomerStatus'))

const CustomerEvents = ({ setLoading }) => {
    const { t } = useTranslation();
    const [index, setIndex] = useState(EVENTS_VIEW.I_EVENTS)
    const [currentEvent, setCurrentEvent] = useState(EVENT_VALUE)

    //fetch events
    const { fetchAPi, fetchLoading } = useFetch(true)

    const [listData, setListData, getDataPaginator] = useListDataPaginator(null, onPageChange)

    useEffect(() => {
        setLoading(fetchLoading)
    }, [fetchLoading])

    // fetch all events
    useEffect(() => {
        fetchAPi('get', URLS.events, {}, true)
            .then(({ data }) => setListData(data))
    }, [])

    function onPageChange(page) {
        fetchAPi('get', URLS.events + '?page=' + page, {}, true)
            .then(({ data }) => setListData(data))
    }

    const addEvent = useCallback((event) => {
        setListData(k => {
            const y = { ...k }
            y.data.unshift(event)
            return y
        })
    }, [])

    const updateComponentIndex = useCallback((index) => setIndex(index), [setIndex])

    const components = useMemo(() => [
        {
            title: t('Mes Événements'),
            component: <EventsList
                events={listData.data || []}
                started={fetchLoading} />
        },
        {
            title: t("Nouveau Événement"),
            component: <CreateEvent
                addEvent={addEvent}
                updateComponentIndex={updateComponentIndex} />
        },
        {
            title: t("Profil"),
            component: <ConfirmAndCustomerStatus
                handleLoading={setLoading} />
        }
    ], [setLoading, updateComponentIndex, listData, addEvent, fetchLoading])

    // handling Event session context
    const updateEvent = useCallback((value) => setCurrentEvent(value), [setCurrentEvent]);
    const eventValue = useMemo(() => ({ ...currentEvent, updateEvent }), [currentEvent])
    // handling Event session context
    return <>
        <div className="d-flex justify-content-between mb-2">
            <h4>{components[index].title}</h4>
            {(index === 0 && !fetchLoading) &&
                <button type="button" onClick={() => setIndex(EVENTS_VIEW.I_NEW_EVENT)} className="btn btn-sm btn-primary">
                    {t('Créer')}
                </button>
            }

            {(index !== 0 && !fetchLoading) &&
                <button type="button" onClick={() => setIndex(EVENTS_VIEW.I_EVENTS)} className="btn btn-sm btn-primary">
                    <i className="ni ni-bold-left"></i>
                </button>
            }
        </div>
        <EventContext.Provider value={eventValue}>
            {components[index].component}
        </EventContext.Provider>
        {index === 0 && <LaravelPagination listData={listData} getDataPaginator={getDataPaginator} />}
    </>
}

const Index = () => {
    const { parentElemt, fullLoading: loading, setFullLoading: setLoading } = useFullLoading()

    return <div className="card" ref={parentElemt}>
        <Suspense fallback={<FullLoader parent={parentElemt.current} />}>
            <div className="card-body">
                <CustomerEvents setLoading={setLoading} />
            </div>
        </Suspense>
        {loading && <FullLoader parent={parentElemt.current} />}
    </div>
}

/**
 * 
 * @param { HTMLElement|Element } element 
 * @param { string } locale 
 * @param { {} } urls 
 */
export const init = (element, locale, urls = {}) =>
    InitReact(<Index />, element, locale, urls);