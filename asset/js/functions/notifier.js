//@ts-check
import notifier from 'codex-notifier';
import { ConfirmNotifierOptions, NotifierOptions, PromptNotifierOptions } from 'codex-notifier';

const asyncTimer = (time = 8000) => new Promise(resolve => {
    window.setTimeout(() => resolve(true), time)
})

export const Notifier = {
    sussess(message = '', time = 8000) {
        notifier.show({ message, time, style: 'success' })
        return asyncTimer(time)
    },
    error(message = '', time = 8000) {
        notifier.show({ message, style: 'error', time })
        return asyncTimer(time)
    },
    /**
     * @param { NotifierOptions | ConfirmNotifierOptions | PromptNotifierOptions } options 
     */
    customNotifier(options) {
        notifier.show(options)
    }
}