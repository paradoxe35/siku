import 'notify-js-lib'

const bootstrap = { ...$.notify.getStyle('bootstrap') }
$.notify.addStyle('bootstrap', {
    ...bootstrap,
    html: `<div style="white-space: normal;font-size: 13px; max-width: 250px">
            <span data-notify-text></span>
        </div>`,
})

const asyncTimer = (time = 5000) => new Promise(resolve => {
    window.setTimeout(() => resolve(true), time)
})

export const Notifier = {
    sussess(message = '', time = 5000) {
        $.notify(message, { position: "bottom left", className: 'success', autoHideDelay: time });
        return asyncTimer(time)
    },
    error(message = '', time = 5000) {
        $.notify(message, { position: "bottom left", className: 'error', autoHideDelay: time });
        return asyncTimer(time)
    },
}