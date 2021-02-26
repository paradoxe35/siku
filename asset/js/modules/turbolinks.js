import Turbolinks from 'turbolinks'
import { debounce } from '../functions/functions'

export class TurbolinksApp {
    /**
     * @returns { Turbolinks }
     */
    static get isc() {
        return Turbolinks
    }

    static start() {
        Turbolinks.start()

        document.addEventListener('turbolinks:render', () => {
            document.querySelector('html').lang =
                document.querySelector('meta[name="lang"]')
                    .getAttribute('content')
        })
        // this.fixHashRendering()
    }

    static fixHashRendering() {
        let mustReload = { lastLocation: document.location.pathname }

        document.addEventListener('turbolinks:before-render', () => {
            mustReload.lastLocation = document.location.pathname
        })
        const reload = () => {
            const path = document.location.pathname
            if (path !== mustReload.lastLocation) {
                this.reload()
            }
            mustReload.lastLocation = path
        }

        window.onpopstate = debounce(reload, 5000);
    }

    static reload() {
        const { pathname, hash, search } = window.location
        this.isc.visit(
            pathname + hash + search,
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