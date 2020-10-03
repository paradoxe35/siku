//@ts-check
import { Controller } from "stimulus"

export default class extends Controller {
    
    async initialize() {
        (await import('@lib/argon/js/argon.js')).connect()
    }

}
