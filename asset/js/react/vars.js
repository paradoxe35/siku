//@ts-check
//genera variable
export let URLS = {}
export let LANG = null
export const setURLS = (urls) => URLS = urls
export const setLang = (lang) => LANG = lang

// event controller
export const I_EVENTS = 0
export const I_NEW_EVENT = 1;
export const I_PROFILE_STATUS = 2;

export const ASYNC = {
    idle: 'idle',
    pending: 'pending'
}

export const EVENT_VALUE = {
    name: null,
    id: null,
    route: null,
    price: {
        sms: 0,
        whatsapp: null
    },
    created_at: null,
    active: null,
    hash: null,
    guests: 0,
    event_date: null
}

export const TEMPLATE_SECTION = {
    sms: 'sms',
    whatsapp: 'whatsapp'
}

export const Event_Guests_Name = 'event_guests_list'
export const Event_Guest = 'Event_Guest'
export const Event_Process_Queue = 'Event_Process_Queue'
export const Event_Open_Guest_Socket = 'Event_Open_Guest_Socket'

export function dispatchEvent(event, datas) {
    window.dispatchEvent(new CustomEvent(event, {
        detail: datas
    }))
}

export const DispachGuestsDetail = (datas) => {
    dispatchEvent(Event_Guests_Name, datas)
}

export const DispachEventGuestDetail = (datas) => {
    dispatchEvent(Event_Guest, datas)
}

export const DispachEventProcessQueueDetail = (datas) => {
    dispatchEvent(Event_Process_Queue, datas)
}

export const DispachEventOpenGuestSocketDetail = (datas) => {
    dispatchEvent(Event_Open_Guest_Socket, datas)
}
