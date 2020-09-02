import Api from "@js/api/api"

/**
 * @param { string } url 
 * @param { string } countryCode 
 */
export const getTariffByCountry = (url, countryCode) => {
    return Api.get(`${url}?country_code=${countryCode}`)
}