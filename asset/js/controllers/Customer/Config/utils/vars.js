export let URLS = {}
export const setURLS = (urls) => URLS = urls
export const I_EVENTS = 0
export const I_NEW_EVENT = 1;
export const I_PROFILE_STATUS = 2;

export const EVENT_VALUE = {
    name: null,
    id: null,
    route: null,
    price: null,
    created_at: null,
    confirmed: null,
    active: null,
    hash: null,
    guests: null,
    user: {
        name: null,
        hash: null
    },
    center: {
        phone: null,
        active: null
    }
}