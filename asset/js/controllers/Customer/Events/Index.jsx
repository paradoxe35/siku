//@ts-check
import React, { useCallback, useState, useMemo, useEffect, lazy, Suspense, Fragment } from 'react'
import { useTranslation } from "react-i18next";
import { Paginate } from '@/js/react/components/Paginate';
import { FullLoader } from '@/js/react/components/FullLoader';
import { I_EVENTS, EVENT_VALUE, I_NEW_EVENT, URLS } from '@/js/react/vars';
import { EventContext } from '@js/react/contexts';
import { EventsList } from './EventsList';
import { ApiRequest } from '@/js/api/api';
import { useFullLoading } from '@/js/react/hooks';
import { InitReact } from '@/js/react/init';

const CreateEvent = lazy(() => import('./CreateEvent'))
const ConfirmAndCustomerStatus = lazy(() => import('./ConfirmAndCustomerStatus'))

const CustomerEvents = ({ setLoading = null, handleLoading }) => {
    const { t } = useTranslation();
    const [index, setIndex] = useState(I_EVENTS)
    const [currentEvent, setCurrentEvent] = useState(EVENT_VALUE)
    const [started, setStarted] = useState(true)
    const [paginate, setPaginate] = useState({})

    //fetch events
    const [events, setEvents] = useState([])
    const [fetchEventsUrl, setFetchEventsUrl] = useState(URLS.events)

    // fetch all events
    useEffect(() => {
        if (URLS.events !== fetchEventsUrl) setLoading(true);
        ApiRequest('get', fetchEventsUrl, {}, true)
            .then(res => {
                setEvents((res.data.events ? res.data.events : []))
                setPaginate(res.data.links)
            })
            .finally(() => {
                setStarted(false)
                setLoading(false)
            })
    }, [fetchEventsUrl])
    const addEvent = useCallback((event) => setEvents(e => [event, ...e]), [])
    const updateComponentIndex = useCallback((index) => setIndex(index), [setIndex])

    const components = useMemo(() => [
        {
            title: t('Mes Événements'),
            component: <EventsList
                events={events}
                started={started} />
        },
        {
            title: t("Nouveau Événement"),
            component: <CreateEvent
                addEvent={addEvent}
                updateComponentIndex={updateComponentIndex} />
        },
        {
            title: t("Profile"),
            component: <ConfirmAndCustomerStatus
                handleLoading={handleLoading} />
        }
    ], [handleLoading, updateComponentIndex, events, started])

    // handling Event session context
    const updateEvent = useCallback((value) => setCurrentEvent(value), [setCurrentEvent]);
    const eventValue = useMemo(() => ({ ...currentEvent, updateEvent }), [currentEvent])
    // handling Event session context
    return <>
        <div className="d-flex justify-content-between mb-2">
            <h4>{components[index].title}</h4>
            {(index === 0 && !started) &&
                <button type="button" onClick={() => setIndex(I_NEW_EVENT)} className="btn btn-sm btn-primary">
                    {t('Créer')}
                </button>
            }

            {(index !== 0 && !started) &&
                <button type="button" onClick={() => setIndex(I_EVENTS)} className="btn btn-sm btn-primary">
                    <i className="ni ni-bold-left"></i>
                </button>
            }
        </div>
        <EventContext.Provider value={eventValue}>
            {components[index].component}
        </EventContext.Provider>
        {index === 0 && <Paginate pagination={paginate} onChange={(paginationUrl) => setFetchEventsUrl(paginationUrl)} />}
    </>
}

const Index = () => {
    const { parentElemt, fullLoading: loading, setFullLoading: setLoading } = useFullLoading()

    const handleLoading = useCallback((status) => setLoading(status), [])

    return <div className="card" ref={parentElemt}>
        <Suspense fallback={<FullLoader parent={parentElemt.current} />}>
            <div className="card-body">
                <CustomerEvents setLoading={setLoading} handleLoading={handleLoading} />
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