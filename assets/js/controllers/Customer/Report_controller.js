//@ts-check
import { Controller } from "stimulus"

export default class extends Controller {
    urls = {
        eventReportOverview: this.data.get('eventReportOverview'),
        eventReportAttended: this.data.get('eventReportAttended'),
        eventReportAbsent: this.data.get('eventReportAbsent'),
        eventReportDownload: this.data.get('eventReportDownload'),
    }

    async connect() {
        const { init } = await import('./Report/Index.jsx')
        this.react = init(this.targets.find('content'), document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
    }
}
