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

    static reload() {
        this.isc.visit(
            window.location.pathname + window.location.search,
            { action: 'replace' }
        )
    }

    static replace(url) {
        this.isc.visit(url,
            { action: 'replace' }
        )
    }

    static visit(url) {
        this.isc.visit(url)
    }
}