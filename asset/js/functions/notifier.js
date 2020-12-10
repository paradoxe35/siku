import 'notify-js-lib'
import { TurbolinksApp } from '../modules/turbolinks'
import { Localize } from './localize'

const bootstrap = { ...$.notify.getStyle('bootstrap') }
$.notify.addStyle('bootstrap', {
    ...bootstrap,
    html: `<div style="white-space: normal;word-wrap: break-word;font-size: 13px; max-width: 270px;min-width: 190px;">
            <span data-notify-text></span>
        </div>`,
})

const asyncTimer = (time = 5000) => new Promise(resolve => {
    window.setTimeout(() => resolve(true), time)
})

export const Notifier = {
    success(message = '', time = 5000) {
        $.notify(message, { position: "bottom center", className: 'success', autoHideDelay: time });
        return asyncTimer(time)
    },
    error(message = '', time = 5000) {
        $.notify(message, { position: "bottom center", className: 'error', autoHideDelay: time });
        return asyncTimer(time)
    },
}

export const savedChanges = (reload = true) => {
    Notifier.success(Localize({
        fr: 'Modifications enregistrées',
        en: 'Saved changes'
    }))
    if (reload) {
        window.setTimeout(() => TurbolinksApp.reload(), 3000)
    }
}