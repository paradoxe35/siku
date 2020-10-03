//@ts-check
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translation/en";


export const i18nReactInit = (locale) => {
    i18n
        .use(initReactI18next)
        .init({
            resources: {
                en: {
                    translation: en
                }
            },
            lng: locale,
            interpolation: {
                escapeValue: false
            }
        });
}