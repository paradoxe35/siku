import '@stimulus/polyfills'
import './functions/functions'
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
import { SwupApp } from './functions/Swup'
import $ from 'jquery'
import '@js/utils/CustomElements'

window.$ = window.jQuery = $
import 'bootstrap'

SwupApp.init()
const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))
