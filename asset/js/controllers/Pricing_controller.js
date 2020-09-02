import { Controller } from "stimulus"
import { clientCountry } from "@js/functions/services"
import { countriesFlagAndEmojis } from "@js/api/services"
import { getTariffByCountry } from "@js/api/tariff/tariff"
import { Localize } from "../functions/localize"

export default class extends Controller {
    static targets = ['countrySelectField', 'guestField', 'smsPrice', 'wtspPrice']
    url = {
        countryPricing: this.data.get('countryPricing')
    }
    prices = {
        sms: null,
        whatsapp: null
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
        return m !== null ? (m * (!isNaN(g) && +g > 0 ? +g : 1)).nround(3) : null;
    }

    /**
     * @param { string } countryCode 
     */
    connectedCountry(countryCode) {
        getTariffByCountry(this.url.countryPricing, countryCode)
            .then(({ data }) => {
                this.prices.sms = data.prices.sms
                this.prices.whatsapp = data.prices.whatsapp
                this.showPricesText({
                    prices: {
                        sms: this.roundByGuestValue(this.prices.sms),
                        whatsapp: this.roundByGuestValue(this.prices.whatsapp)
                    }
                })
            })
            .catch(error => console.error(error))
    }

    /**
     * @param { number } p 
     */
    textPrice = (p) => p == null ? Localize({ fr: 'indisponible', en: 'unavailable' }) : `$${p}`

    /**
     * @param { Object } data 
     */
    showPricesText({ prices }) {
        this.smsPrice.textContent = this.textPrice(prices.sms)
        this.wtspPrice.textContent = this.textPrice(prices.whatsapp)
    }

    /**
     * @param { Event } e 
     */
    updatePrices = ({ target: { value } }) => {
        const typing = isNaN(value) || +value < 1 || +value > 1000000;
        if (typing || (!this.prices.sms && !this.prices.whatsapp)) return
        this.showPricesText({
            prices: {
                sms: this.prices.sms !== null ?
                    (this.prices.sms * (+value)).nround(3) :
                    null,
                whatsapp: this.prices.whatsapp !== null ?
                    (this.prices.whatsapp * (+value)).nround(3) :
                    null
            }
        })
    }

    /**
     * @returns { HTMLElement }
     */
    get smsPrice() {
        return this.smsPriceTarget
    }

    /**
     * @returns { HTMLElement }
     */
    get wtspPrice() {
        return this.wtspPriceTarget
    }

    /**
     * @returns { HTMLElement }
     */
    get countrySelectField() {
        return this.countrySelectFieldTarget
    }


    /**
     * @returns { HTMLInputElement }
     */
    get guestField() {
        return this.guestFieldTarget
    }
}
