//@ts-check
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

export const KeysRequiredInText = ['{name}', '{code}']

export const TEMPLATE_SECTION = {
    sms: 'sms',
    whatsapp: 'whatsapp'
}

export const useSectionText = () => {
    const [section, setSection] = useState(TEMPLATE_SECTION.sms)
    const handleSection = useCallback(({ target: { value } }) => {
        setSection(value)
    }, [setSection])

    return { handleSection, section }
}


/**
* @param { string } section 
* @param { { sms: string, whatsapp: string }} textValue 
*/
export const caseSectionValue = (section, textValue) => {
    switch (section) {
        case TEMPLATE_SECTION.sms:
            return textValue.sms
            break;
        case TEMPLATE_SECTION.whatsapp:
            return textValue.whatsapp
            break;
        default:
            return ''
            break;
    }
}

/**
 * @param { string } section
 * @param { { sms: string, whatsapp: string }} lastState 
 * @param { string } value 
 */
export const caseSection = (section, lastState, value) => {
    let y = {
        sms: '',
        whatsapp: ''
    }
    switch (section) {
        case TEMPLATE_SECTION.sms:
            y = { sms: value, whatsapp: lastState.whatsapp }
            break;
        case TEMPLATE_SECTION.whatsapp:
            y = { sms: lastState.sms, whatsapp: value }
            break;
        default:
            break;
    }
    return { ...y }
}



/**
 * @param {{  section: string  }} param0 
 */
export const SmsDetail = ({ section }) => {
    const { t } = useTranslation();
    return <ul id="sms-counter" className={section != TEMPLATE_SECTION.sms ? 'd-none' : ''}>
        <li>{t('sms')}: <span className="messages"></span></li>
        <li>{t('Par sms')}: <span className="per_message"></span></li>
        {/* <li>{t('Restant')}: <span className="remaining"></span></li> */}
    </ul>
}

/**
 * @param { { src: string, alt: string } } param0 
 */
export const ImgIcon = ({ src, alt }) => <img src={src} className="checkbox-icon" alt={alt} width="20" height="20" />


/**
 * @param {{  onChange: any, icon?: boolean, name?: string }} param0 
 */
export const SectionView = ({ onChange, icon = true, name = "message_view" }) => {
    const { t } = useTranslation();
    return <div className="mb-3">
        <div className="custom-control custom-radio custom-control-inline">
            <input type="radio" id={name + '-sms'} defaultChecked onChange={onChange} name={name} value={TEMPLATE_SECTION.sms} className="custom-control-input" />
            <label className="custom-control-label" htmlFor={name + '-sms'}>
                {icon && <ImgIcon src="/img/svg/sms.svg" alt="SMS" />} {t('SMS')}
            </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
            <input type="radio" id={name + '-whatsapp'} onChange={onChange} name={name} value={TEMPLATE_SECTION.whatsapp} className="custom-control-input" />
            <label className="custom-control-label" htmlFor={name + '-whatsapp'}>
                {icon && <ImgIcon src="/img/svg/whatsapp.svg" alt="WhatsApp" />}  {t('WhatsApp')}
            </label>
        </div>
    </div>
}


export const TextAreatEdit = ({ handleSection, section, handleTextChange, handleKeyUp, textValue, name }) => {
    const { t } = useTranslation();
    useEffect(() => {
        const time = setTimeout(() => {
            // @ts-ignore
            $('#message').countSms('#sms-counter')
        }, 500)
        return () => {
            clearTimeout(time)
        }
    }, [])
    return <>
        <SectionView onChange={handleSection} />
        <div className="form-group">
            <SmsDetail section={section} />
            <div className="input-group input-group-merge">
                <textarea required
                    id="message"
                    onChange={handleTextChange}
                    onKeyUp={handleKeyUp}
                    value={caseSectionValue(section, textValue)}
                    placeholder={t("Entrez votre modèle texte ici") + '...'}
                    is="textarea-autogrow"
                    name={name}
                    className="form-control text-default"
                    rows={8} />
            </div>
        </div>
    </>
}