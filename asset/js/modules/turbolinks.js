import Turbolinks from 'turbolinks'
// import { LozadObserver } from './Lozad';

export class TurbolinksApp {
    /**
     * @returns { Turbolinks }
     */
    static get isc() {
        return Turbolinks
    }

    static start() {
        Turbolinks.start()
    }
}