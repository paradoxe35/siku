//@ts-check
import { Controller } from "stimulus"

export default class extends Controller {
    urls = { 
        trash: this.data.get('trash'),
        templates: this.data.get('templates'),
        guests: this.data.get('guests'),
        validators: this.data.get('validators'),
        eventMenuProfile: this.data.get('eventMenuProfile'),
        eventProfileItems: this.data.get('eventProfileItems'),
        eventReportOverview: this.data.get('eventReportOverview'),
        eventReportAttended: this.data.get('eventReportAttended'),
        eventReportAbsent: this.data.get('eventReportAbsent'),
        eventReportDownload: this.data.get('eventReportDownload'),
    }

    async connect() {
        const { init } = await import('./show/Index.jsx')
        this.react = init(this.element, document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
    }

}
