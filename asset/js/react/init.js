//@ts-check
import React from 'react'
import { i18nReactInit } from '@/js/react/i18n';
import { setURLS, setLang } from '@/js/react/vars';
import ReduxProvider from '@/js/react/components/ReduxProvider';
import { render, unmountComponentAtNode } from 'react-dom'

/**
 * 
 * @param { JSX.Element } App 
 * @param { HTMLElement|Element } element 
 * @param { string } locale 
 * @param { Object } urls 
 */
export const InitReact = (App, element, locale, urls = {}) => {
    i18nReactInit(locale)
    setURLS(urls)
    setLang(locale)
    render((
        <ReduxProvider>
            {App}
        </ReduxProvider>), element)
    return () => unmountComponentAtNode(element)
}