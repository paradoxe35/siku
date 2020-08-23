import { Controller } from "stimulus"

export default class extends Controller {

    initialize() {
        this.urls = {
            cartItems: this.data.get('cartItems'),
            cartItemDelete: this.data.get('cartItemDelete'),
            isAuth: this.data.get('isAuth'),
            login: this.data.get('login'),
            checkout: this.data.get('checkout')
        }
    }

    async connect() {
        const { init } = await import('./customer-config/Index.jsx')
        this.react = init(this.element, document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
    }

}
