//@ts-check
import '@stimulus/polyfills'
import './functions/lib'
import $ from 'jquery'
import '@js/utils/CustomElements'
import startStimulus from './utils/stimulus'

// @ts-ignore
window.$ = window.jQuery = $
import 'bootstrap'

startStimulus(
    // @ts-ignore
    () => import.meta.globEager(`./controllers/**/*_controller.js`),
    // @ts-ignore
    () => require.context(`./controllers`, true, /\_controller.js$/)
)