import React, { useCallback, useRef, useState, useMemo, useEffect } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { Paginate } from '@/js/components/Paginate';
import { FullLoader } from '@/js/components/FullLoader';
import { CreateEvent } from './CreateEvent'
import { ConfirmAndCustomerStatus } from './ConfirmAndCustomerStatus'
import { I_EVENTS, EVENT_VALUE, I_NEW_EVENT, setURLS } from './utils/vars';
import { EventContext } from './utils/contexts';
import { EventsList } from './EventsList';
import Api from "@/js/api/api";


const CustomerConfig = () => {
    const { t } = useTranslation();
    const [index, setIndex] = useState(I_EVENTS)
    const [currentEvent, setCurrentEvent] = useState(EVENT_VALUE)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [started, setStarted] = useState(true)
    const [paginate, setPaginate] = useState({})
    const parentElemt = useRef(null)

    // fetch all events
    useEffect(() => {
        setStarted(false)
        // setPaginate({})
    }, [])
    const addEvent = useCallback((event) => setEvents(e => [...e, event]))
    const updateComponentIndex = useCallback((index) => setIndex(index), [setIndex])
    const handleLoading = useCallback((status) => setLoading(status))
    const components = useMemo(() => [
        {
            title: 'Mes Événements',
            component: <EventsList
                events={events}
                started={started}
                handleLoading={handleLoading}
                updateComponentIndex={updateComponentIndex} />
        },
        {
            title: "Nouveau Événement",
            component: <CreateEvent
                handleLoading={handleLoading}
                addEvent={addEvent}
                updateComponentIndex={updateComponentIndex} />
        },
        {
            title: "Profile",
            component: <ConfirmAndCustomerStatus
                handleLoading={handleLoading}
                updateComponentIndex={updateComponentIndex} />
        }
    ], [handleLoading, updateComponentIndex, events, started])

    // handling Event session context
    const updateEvent = useCallback((value) => setCurrentEvent(value), [setCurrentEvent]);
    const eventValue = useMemo(() => ({ ...currentEvent, updateEvent }), [currentEvent])
    // handling Event session context
    return <div className="card" ref={parentElemt}>
            <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                    <h4>{t(components[index].title)}</h4>
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
                {index === 0 && <Paginate pagination={paginate} />}
            </div>
            {loading && <FullLoader parent={parentElemt.current} />}
        </div>
}

/**
 * 
 * @param { HTMLElement } element 
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
    render(<CustomerConfig urls={urls} />, element)
    return () => unmountComponentAtNode(element)
}