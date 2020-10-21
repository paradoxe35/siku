//@ts-check
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Localize } from '@/js/functions/localize';
import { Notifier } from '@/js/functions/notifier';
import { TEMPLATE_SECTION } from '@/js/react/vars';

export const KeysRequiredInText = ['{name}', '{code}']


/**
 * @param {string} sms 
 * @returns {{encoding: string, length: number, per_message: number, remaining: number, messages: number}}
 */
export const smsCount = (sms) => {
    // @ts-ignore
    return window.SmsCounter.count(sms)
}

export const useSectionText = () => {
    const [section, setSection] = useState(TEMPLATE_SECTION.sms)
    const handleSection = useCallback(({ target: { value } }) => {
        setSection(value)
    }, [setSection])

    return { handleSection, section }
}


export const useItemDeletion = () => {
    const modalConfirm = useRef(null)
    const [deletionLoading, setDeletionLoading] = useState(false)
    const [deletionId, setDeletionId] = useState(null)

    // delete event template
    const handleDelete = useCallback(async (id) => {
        setDeletionId(id)
        if (modalConfirm.current)
            // @ts-ignore
            $(modalConfirm.current).modal('show');
    }, [modalConfirm.current, setDeletionId])


    const closeModal = () => {
        // @ts-ignore
        $(modalConfirm.current).modal('hide')
        setDeletionLoading(false)
        setDeletionId(null)
    }

    return {
        modalConfirm,
        deletionLoading,
        setDeletionLoading,
        deletionId,
        setDeletionId,
        handleDelete,
        closeModal
    }
}

/**
 * @returns { boolean }
 * @param { Object } templateTextarea 
 * @param { Array } requiredKeys 
 */
export const validateTemplateSms = (templateTextarea, requiredKeys) => {
    const sms = requiredKeys.filter(k => templateTextarea.sms.indexOf(k) < 0)
    if (sms.length) {
        Notifier.error(sms.join(', ') + Localize({
            fr: ' est / sont requis dans vos modèles sms text',
            en: 'is / are required in your text sms templates'
        }))
    }
    return !!!sms.length;
}

/**
 * @returns { boolean }
 * @param { Object } templateTextarea 
 * @param { Array } requiredKeys 
 */
export const validateTemplateWhatsapp = (templateTextarea, requiredKeys) => {
    const whatsapp = requiredKeys.filter(k => templateTextarea.whatsapp.indexOf(k) < 0)
    if (whatsapp.length) {
        Notifier.error(whatsapp.join(', ') + Localize({
            fr: ' est / sont requis dans vos modèles whatsapp text',
            en: 'is / are required in your text whatsapp templates'
        }))
    }
    return !!!whatsapp.length;
}

/**
 * @returns { boolean }
 * @param { Object } templateTextarea 
 * @param { Array } requiredKeys 
 */
export const validateTemplate = (templateTextarea, requiredKeys) => {
    const whatsapp = validateTemplateWhatsapp(templateTextarea, requiredKeys)
    const sms = validateTemplateSms(templateTextarea, requiredKeys)
    return (sms && whatsapp)
}


/**
 * @param {{ 
    *      item: { id: number, name: string, sms: number, text: { sms: string, whatsapp: string }, show?: boolean },
    *      onDelete?: (id: number) => void, canShown?: Array
    *   }} param0 
    */
export const ListDescriptionText = ({ item, onDelete, canShown = null }) => {
    const { t } = useTranslation()
    const { handleSection, section } = useSectionText()

    return <>
        {item.show ? (
            <div className="row mt-3" onClick={e => e.stopPropagation()}>
                <div className="col">
                    <SectionView onChange={handleSection} icon={false} name={'template_view-' + item.id} canShown={canShown} />
                </div>
                <div className="col-auto">
                    <button type="button" onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                    }} className="btn btn-secondary btn-sm text-danger">{t('Supprimer')}</button>
                </div>
            </div>
        ) : ''}
        <p className="text-sm mb-0" style={{ cursor: 'default' }} onClick={e => e.stopPropagation()}>
            {item.show ? caseSectionValue(section, item.text) : caseSectionValue(section, item.text).slice(0, 101) + '...'}
        </p>
    </>
}


export const List = ({
    Ul: ({ children }) => {
        return <div className="list-group list-group-flush">{children}</div>
    },
    /**
     * @param {{  
     *  data: Array<{ id: number, name: string, sms: number, text: { sms: string, whatsapp: string }, show?: boolean }>,
     *  children?: any
     * }} param0
     */
    Li: ({ data, children }) => {
        const [datas, setDatas] = useState([])
        const { t } = useTranslation()

        useEffect(() => {
            setDatas(data.map(g => ({ ...g, show: false })))
        }, [data])
        /**
         * @param {number} id
         */
        const showItem = (id, e) => {
            // e.target.scrollIntoView()
            setDatas(d => d.map(g => ({ ...g, show: (id === g.id && !g.show) })))
        }
        return <>
            {datas.map(v => {
                return <a key={String(v.id)} onClick={(e) => showItem(v.id, e)} className="list-group-item clickable-a clickable-list flex-column align-items-start py-4 px-4">
                    {children(v)}
                </a>
            })}
        </>
    }
})

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

const canShow = (p, n) => (p === null || (typeof p === 'object' && p.includes(n)))

/**
 * @param {{  onChange: any, icon?: boolean, name?: string, canShown?: Array }} param0 
 */
export const SectionView = ({ onChange, icon = true, name = "message_view", canShown = null }) => {
    const { t } = useTranslation();
    return <div className="mb-3">
        {
            canShow(canShown, TEMPLATE_SECTION.sms) &&
            <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id={name + '-sms'} defaultChecked onChange={onChange} name={name} value={TEMPLATE_SECTION.sms} className="custom-control-input" />
                <label className="custom-control-label" htmlFor={name + '-sms'}>
                    {icon && <ImgIcon src="/img/svg/sms.svg" alt="SMS" />} {t('SMS')}
                </label>
            </div>
        }
        {
            canShow(canShown, TEMPLATE_SECTION.whatsapp) &&
            <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id={name + '-whatsapp'} onChange={onChange} name={name} value={TEMPLATE_SECTION.whatsapp} className="custom-control-input" />
                <label className="custom-control-label" htmlFor={name + '-whatsapp'}>
                    {icon && <ImgIcon src="/img/svg/whatsapp.svg" alt="WhatsApp" />}  {t('WhatsApp')}
                </label>
            </div>
        }
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