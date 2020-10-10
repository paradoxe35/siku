//@ts-check
const SCROLLING_NAVBAR_OFFSET_TOP = 50;

export const NavBarMixin = {
    initialize() {
        this.scrollNav = this.scrollNav.bind(this)
    },
    connect() {
        this.scrollNav()
        window.addEventListener('scroll', this.scrollNav)
    },

    disconnect() {
        window.removeEventListener('scroll', this.scrollNav)
    },

    scrollNav() {
        if ($(window).scrollTop() > SCROLLING_NAVBAR_OFFSET_TOP) {
            if (!this.element.classList.contains("affix")) {
                this.element.classList.add("affix");
            }
        } else {
            this.element.classList.remove("affix");
        }
    }
}