import Swup from 'swup';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupFormsPlugin from '@swup/forms-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupHeadPlugin from '@swup/head-plugin';
import { INprogress } from './NProgress';
// import { LozadObserver } from './Lozad';

const Instance = {
    swup: null
}

export class SwupApp {
    /**
     * @returns { InstanceType<Swup> }
     */
    static get swup() {
        return Instance.swup
    }

    static init() {
        let swup = {}
        const isIE = /* @cc_on!@ */ false || !!document.documentMode;
        if (!isIE) {
            swup = new Swup({
                containers: ["#app-main", "#app-footer"],
                plugins: [
                    new SwupScrollPlugin({
                        doScrollingRightAway: false,
                        animateScroll: false
                    }),
                    new SwupFormsPlugin(),
                    new SwupScriptsPlugin({
                        head: false,
                        body: false,
                        optin: true
                    }),
                    new SwupHeadPlugin()
                ],
                cache: false
            });
            Instance.swup = swup
            swup.on('transitionStart', () => INprogress.set())
            swup.on('contentReplaced', () => (INprogress.unset() /*LozadObserver() */))
        }
        // LozadObserver()
        return swup
    }
}