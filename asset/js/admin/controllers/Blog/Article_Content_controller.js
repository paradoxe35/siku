//@ts-check
import { convertToHtml } from "@/js/functions/jsonToHtml"
import { Controller } from "stimulus"

export default class extends Controller {
    initialize() {
        // @ts-ignore
        const { blocks } = window.article_json
        const html = document.createRange().createContextualFragment(convertToHtml(blocks))
        this.targets.find('content')
            .appendChild(html)
    }

}
