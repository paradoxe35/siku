//@ts-check
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Localize } from '@/js/functions/localize';
import { Notifier } from '@/js/functions/notifier';
import { TEMPLATE_SECTION } from '@/js/react/vars';
import { Loader } from '@/js/react/components/Loader';
import { debounce, stripHtml } from '@/js/functions/functions';

export const KeysRequiredInText = ['{name}', '{code}']

const canShow = (p, n) => (p === null || (typeof p === 'object' && p.includes(n)))

/**
 * @param {string} sms 
 * @returns {{encoding: string, length: number, per_message: number, remaining: number, messages: number}}
 */
export const smsCount = (sms) => {
    // @ts-ignore
    return window.SmsCounter.count(sms)
}

export const useSectionText = (defaults = null) => {
    const [section, setSection] = useState((defaults ? defaults : TEMPLATE_SECTION.sms))
    const handleSection = useCallback(({ target: { value } }) => {
        setSection(value)
    }, [setSection])

    return { handleSection, section, setSection }
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
            en: ' is / are required in your text sms templates'
        }))
    }
    return !!!sms.length;
}

/**
 * @returns { boolean }
 * @param { Object } templateTextarea 
 * @param { Array } requiredKeys 
 */
export const validateTemplateMail = (templateTextarea, requiredKeys) => {
    const mail = requiredKeys.filter(k => templateTextarea.mail.indexOf(k) < 0)
    if (mail.length) {
        Notifier.error(mail.join(', ') + Localize({
            fr: ' est / sont requis dans vos modèles mail text',
            en: ' is / are required in your text mail templates'
        }))
    }
    return !!!mail.length;
}

/**
 * @returns { boolean }
 * @param { Object } templateTextarea 
 * @param { Array } requiredKeys 
 */
export const validateTemplate = (templateTextarea, requiredKeys) => {
    const mail = validateTemplateMail(templateTextarea, requiredKeys)
    const sms = validateTemplateSms(templateTextarea, requiredKeys)
    return (sms && mail)
}



/**
 * @param {{ 
    *      item: { id: number, name: string, sms: number, text: { sms: string, mail: string }, show?: boolean },
    *      onDelete?: (id: number) => void, canShown?: Array
    *   }} param0 
    */
export const ListDescriptionText = ({ item, onDelete, canShown = null }) => {
    const { t } = useTranslation()
    const defaultv = canShown && canShown.length ? canShown[0] : TEMPLATE_SECTION.sms

    const { handleSection, section, setSection } = useSectionText(defaultv)

    const text = stripHtml(caseSectionValue(section, item.text))

    useEffect(() => {
        if (!item.show) {
            setSection(defaultv)
        }
    }, [item.show])

    return <>
        {item.show ? (
            <div className="row mt-3" onClick={e => e.stopPropagation()}>
                <div className="col">
                    <SectionView
                        onChange={handleSection}
                        icon={false}
                        name={'template_view-' + item.id}
                        canShown={canShown} />
                </div>
                <div className="col-auto">
                    {onDelete && (
                        <button type="button" onClick={(_) => onDelete(item.id)}
                            className="btn btn-secondary btn-sm text-danger">{t('Supprimer')}</button>
                    )}
                </div>
            </div>
        ) : ''}
        <p className="text-sm mb-0" style={{ cursor: 'default' }} onClick={e => e.stopPropagation()}>
            {item.show ? text : text.slice(0, 101) + '...'}
        </p>
    </>
}


export const List = ({
    Ul: ({ children }) => {
        return <div className="list-group list-group-flush">{children}</div>
    },
    /**
     * @param {{  
     *  data: Array<{ id: number, name: string, sms: number, text: { sms: string, mail: string }, show?: boolean }>,
     *  children?: any
     * }} param0
     */
    Li: ({ data, children }) => {
        const [datas, setDatas] = useState([])

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
* @param { { sms: string, mail: string }} textValue 
*/
export const caseSectionValue = (section, textValue) => {
    switch (section) {
        case TEMPLATE_SECTION.sms:
            return textValue.sms
            break;
        case TEMPLATE_SECTION.mail:
            return textValue.mail
            break;
        default:
            return ''
            break;
    }
}

/**
 * @param { string } section
 * @param { { sms: string, mail: string }} lastState 
 * @param { string } value 
 */
export const caseSection = (section, lastState, value) => {
    let y = {
        sms: '',
        mail: ''
    }
    switch (section) {
        case TEMPLATE_SECTION.sms:
            y = { sms: value, mail: lastState.mail }
            break;
        case TEMPLATE_SECTION.mail:
            y = { sms: lastState.sms, mail: value }
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
 * @param {{  onChange: any, icon?: boolean, name?: string, canShown?: Array }} param0 
 */
export const SectionView = ({ onChange, icon = true, name = "message_view", canShown = null }) => {
    const { t } = useTranslation();
    const tsms = TEMPLATE_SECTION.sms;
    const tmail = TEMPLATE_SECTION.mail;

    const sms = canShow(canShown, tsms);
    const mail = canShow(canShown, tmail);

    canShown = canShown && canShow.length ? canShown : [tsms, tmail]

    return <div className="mb-3">
        {
            sms &&
            <div className="custom-control custom-radio custom-control-inline">
                <input type="radio"
                    id={name + '-sms'}
                    defaultChecked={canShown[0] == tsms}
                    onChange={onChange}
                    name={name}
                    value={tsms} className="custom-control-input" />
                <label className="custom-control-label" htmlFor={name + '-sms'}>
                    {icon && <ImgIcon src="/img/svg/sms.svg" alt="SMS" />} {t('SMS')}
                </label>
            </div>
        }
        {
            mail &&
            <div className="custom-control custom-radio custom-control-inline">
                <input
                    type="radio"
                    id={name + '-mail'}
                    defaultChecked={canShown[0] == tmail}
                    onChange={onChange}
                    name={name}
                    value={tmail}
                    className="custom-control-input" />
                <label className="custom-control-label" htmlFor={name + '-mail'}>
                    {icon && <ImgIcon src="/img/svg/mail.svg" alt="Mail" />}  {t('Mail')}
                </label>
            </div>
        }
    </div>
}

/**
 * @param {string} v 
 */
export const toHtml = (v) => {
    const hasNot = v.indexOf('\n') < 0
    return hasNot ? v : v.replace(/\n/g, '<br>')
}


const QuillEditorMail = ({ value, handleTextChange, handleKeyUp }) => {
    const ref = useRef(null)
    const [loading, setLoading] = useState(false)
    /** @type { { current: import('quill').default } } */
    const quill = useRef(null)

    const updateText = useCallback(() => {
        handleTextChange && handleTextChange({
            target: {
                value: quill.current.root.innerHTML
            }
        })
    }, [handleTextChange])

    const updateTextInStore = useCallback(() => {
        handleKeyUp && handleKeyUp()
    }, [handleKeyUp])

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const lib = (await import('@/js/modules/quill/QuillEditor'))
                const Quill = lib.default

                const qll = quill.current = new Quill(ref.current, lib.defaultOption);
                qll.clipboard.dangerouslyPasteHTML(toHtml(value))

                qll.on("editor-change", updateText)
                qll.on("editor-change", debounce(updateTextInStore, 1000, false))

                updateText()
                window.setTimeout(() => updateTextInStore(), 1000)
            } catch (e) { }
            setLoading(false)
        })()

        return () => {
            if (quill.current) {
                quill.current.off("editor-change", updateText)
                quill.current.off("editor-change", updateTextInStore)
            }
        }
    }, [])

    return <Loader loading={loading}>
        <div className="default-style">
            <div className={loading ? 'py-6' : ''}>
                <div id="full-editor" style={{ maxHeight: "300px", overflowY: "auto" }} ref={ref}></div>
            </div>
        </div>
    </Loader>
}

export const TextAreatEdit = ({ handleSection, section, handleTextChange, handleKeyUp, textValue, name }) => {
    const { t } = useTranslation();
    const ref = useRef(null)

    useEffect(() => {
        const time = setTimeout(() => {
            // @ts-ignore
            ref.current && $(ref.current).countSms('#sms-counter')
        }, 500)
        return () => {
            clearTimeout(time)
        }
    }, [section])
    return <>
        <SectionView onChange={handleSection} />
        {
            section === TEMPLATE_SECTION.mail ? (
                <>
                    <QuillEditorMail
                        handleKeyUp={handleKeyUp}
                        handleTextChange={handleTextChange}
                        value={caseSectionValue(section, textValue)} />
                </>
            ) : (
                    <div className="form-group">
                        <SmsDetail section={section} />
                        <div className="input-group input-group-merge">
                            <textarea required
                                ref={ref}
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
                )
        }
    </>
}