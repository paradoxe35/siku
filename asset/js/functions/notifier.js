//@ts-check
import notifier from 'codex-notifier';
import { ConfirmNotifierOptions, NotifierOptions, PromptNotifierOptions } from 'codex-notifier';

export const Notifier = {
    sussess(message = '', time = 8000) {
        notifier.show({ message, time, style: 'success' })
    },
    error(message = '', time = 8000) {
        notifier.show({ message, style: 'error', time })
    },
    /**
     * @param { NotifierOptions | ConfirmNotifierOptions | PromptNotifierOptions } options 
     */
    customNotifier(options) {
        notifier.show(options)
    }
}