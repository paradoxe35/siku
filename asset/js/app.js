import '@stimulus/polyfills'
import './functions/lib'
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
import $ from 'jquery'
import '@js/utils/CustomElements'
import { TurbolinksApp } from './modules/turbolinks'

window.$ = window.jQuery = $
import 'bootstrap'

TurbolinksApp.start()
const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))
