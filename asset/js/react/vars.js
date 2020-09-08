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