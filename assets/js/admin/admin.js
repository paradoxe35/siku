import '@stimulus/polyfills'
import '@js/functions/lib'
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
//@ts-check
import $ from 'jquery'
import '@js/utils/CustomElements'
import startStimulus from '../utils/stimulus'

window.$ = window.jQuery = $
import 'bootstrap'

startStimulus(
    // @ts-ignore
    () => import.meta.globEager(`./controllers/**/*_controller.js`),
    // @ts-ignore
    () => require.context(`./controllers`, true, /\_controller.js$/)
)