import { Controller } from "stimulus"

const SCROLLING_NAVBAR_OFFSET_TOP = 50;

export default class extends Controller {

    connect() {
        window.addEventListener('scroll', this.scrollNav)
    }

    disconnect() {
        window.removeEventListener('scroll', this.scrollNav)
    }

    scrollNav = () => {
        if ($(window).scrollTop() > SCROLLING_NAVBAR_OFFSET_TOP) {
            if (!this.element.classList.contains("affix")) {
                this.element.classList.add("affix");
            }
        } else {
            this.element.classList.remove("affix");
        }
    }

}
