//@ts-check
import React, { useCallback, useRef, useState, useMemo, useEffect } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { Paginate } from '@/js/react/components/Paginate';
import { FullLoader } from '@/js/react/components/FullLoader';
import { CreateEvent } from './CreateEvent'
import { ConfirmAndCustomerStatus } from './ConfirmAndCustomerStatus'
import { I_EVENTS, EVENT_VALUE, I_NEW_EVENT, setURLS, URLS, setLang } from '@/js/react/vars';
import { EventContext } from '@js/react/contexts';
import { EventsList } from './EventsList';
import ReduxProvider from '@/js/react/components/ReduxProvider';
import { ApiRequest } from '@/js/api/api';


const CustomerEvents = () => {
    const { t } = useTranslation();
    const [index, setIndex] = useState(I_EVENTS)
    const [currentEvent, setCurrentEvent] = useState(EVENT_VALUE)
    const [loading, setLoading] = useState(false)
    const [started, setStarted] = useState(true)
    const [paginate, setPaginate] = useState({})
    const parentElemt = useRef(null)

    //fetch events
    const [events, setEvents] = useState([])
    const [fetchEventsUrl, setFetchEventsUrl] = useState(URLS.events)

    // fetch all events
    useEffect(() => {
        ApiRequest('get', fetchEventsUrl, {}, true)
            .then(res => {
                setEvents((res.data.events ? res.data.events : []))
                setPaginate(res.data.links)
            })
            .finally(() => {
                setLoading(false)
                setStarted(false)
            })
    }, [fetchEventsUrl])
    const addEvent = useCallback((event) => setEvents(e => [...e, event]), [])
    const updateComponentIndex = useCallback((index) => setIndex(index), [setIndex])
    const handleLoading = useCallback((status) => setLoading(status), [])
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
    return <div className="card" ref={parentElemt}>
        <div className="card-body">
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
        </div>
        {loading && <FullLoader parent={parentElemt.current} />}
    </div>
}

/**
 * 
 * @param { HTMLElement|Element } element 
 * @param { string } locale 
 * @param { Object } urls 
 */
export const init = (element, locale, urls = {}) => {
    i18n
        .use(initReactI18next)
        .init({
            resources: {
                en: {
                    translation: {}
                }
            },
            lng: locale,
            interpolation: {
                escapeValue: false
            }
        });
    setURLS(urls)
    setLang(locale)
    render((
        <ReduxProvider>
            <CustomerEvents />
        </ReduxProvider>), element)
    return () => unmountComponentAtNode(element)
}