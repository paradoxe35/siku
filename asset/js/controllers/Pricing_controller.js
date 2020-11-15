//@ts-check
import { Controller } from "stimulus"
import { clientCountry } from "@js/functions/services"
import { countriesFlagAndEmojis } from "@js/api/services"
import { Localize } from "../functions/localize"
import { ApiRequest } from "../api/api"
import { SYMBOL } from "../functions/functions"

export default class extends Controller {
    url = {
        countryPricing: this.data.get('countryPricing')
    }
    prices = {
        sms: null,
        mail: null
    }

    connect() {
        this.initSelect2()
        this.guestField.addEventListener('keyup', this.updatePrices)
        this.guestField.addEventListener('change', this.updatePrices)
    }

    disconnect() {
        this.guestField.removeEventListener('keyup', this.updatePrices)
        this.guestField.removeEventListener('change', this.updatePrices)
        this.select && this.select.destroy()
    }

    async initSelect2() {
        this.select = await clientCountry(this.countrySelectField, async (c) => {
            const countries = await countriesFlagAndEmojis()
            return countries.map(country => {
                const sc = c.country_code == country.code;
                sc && this.connectedCountry(country.code)
                return {
                    text: `${country.emoji} ${country.name}`,
                    value: country.code,
                    selected: sc
                }
            })
        })
        this.select.onChange = (c) =>
            this.connectedCountry(c.value);
    }

    /**
     * @param { number } m 
     */
    roundByGuestValue(m) {
        const g = this.guestField.value;
        // @ts-ignore
        return m !== null ? (m * (!isNaN(g) && +g > 0 ? +g : 1)).nround(3) : null;
    }

    /**
     * @param { string } countryCode 
     */
    connectedCountry(countryCode) {
        ApiRequest('get', `${this.url.countryPricing}?country_code=${countryCode}`, {})
            .then(({ data }) => {
                this.prices.sms = data.prices.sms
                this.prices.mail = data.prices.mail
                this.showPricesText({
                    prices: {
                        sms: this.roundByGuestValue(this.prices.sms),
                        mail: this.roundByGuestValue(this.prices.mail)
                    }
                })
            })
            .catch(error => console.error(error))
    }

    /**
     * @param { number } p 
     */
    textPrice = (p) => p == null ? Localize({ fr: 'indisponible', en: 'unavailable' }) : `${SYMBOL + p}`

    /**
     * @param { Object } data 
     */
    showPricesText({ prices }) {
        this.smsPrice.textContent = this.textPrice(prices.sms)
        this.wtspPrice.textContent = this.textPrice(prices.mail)
    }

    /**
     * @param { Event } e 
     */
    // @ts-ignore
    updatePrices = ({ target: { value } }) => {
        const typing = isNaN(value) || +value < 1 || +value > 1000000;
        if (typing || (!this.prices.sms && !this.prices.mail)) return
        this.showPricesText({
            prices: {
                sms: this.prices.sms !== null ?
                    // @ts-ignore
                    (this.prices.sms * (+value)).nround(3) :
                    null,
                mail: this.prices.mail !== null ?
                    // @ts-ignore
                    (this.prices.mail * (+value)).nround(3) :
                    null
            }
        })
    }

    /**
     * @returns { HTMLElement|Element }
     */
    get smsPrice() {
        return this.targets.find('smsPrice')
    }

    /**
     * @returns { HTMLElement | Element }
     */
    get wtspPrice() {
        return this.targets.find('wtspPrice')
    }

    /**
     * @returns { HTMLElement }
     */
    get countrySelectField() {
        // @ts-ignore
        return this.targets.find('countrySelectField')
    }


    /**
     * @returns { HTMLInputElement }
     */
    get guestField() {
        // @ts-ignore
        return this.targets.find('guestField')
    }
}
