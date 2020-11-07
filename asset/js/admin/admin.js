import '@stimulus/polyfills'
import '@js/functions/lib'
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
import $ from 'jquery'
import '@js/utils/CustomElements'
import { TurbolinksApp } from '@js/modules/turbolinks'

window.$ = window.jQuery = $
import 'bootstrap'

TurbolinksApp.start()
const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))

window.rform = (form) => {
    const searchForm = new URLSearchParams(new FormData(form))
    const csearch = new URLSearchParams(window.location.search)
    csearch.forEach((v, k) => {
        if (!searchForm.has(k)) {
            searchForm.set(k, v)
        }
    })
    const { origin, pathname } = window.location
    TurbolinksApp.replace(origin + pathname + '?' + searchForm.toString())
}

window.tvisit = (link) => {
    TurbolinksApp.visit(link)
}