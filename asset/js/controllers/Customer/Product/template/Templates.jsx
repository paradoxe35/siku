//@ts-check
import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useTranslation } from "react-i18next";
import Help from './Help';
import { Localize } from '@/js/functions/localize';
import { DefaultButton } from '@/js/react/components/Buttons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTemplateTextAreaValue, setTemplateNameValue, fetchEventTemplates } from '@/js/store/features/product/TemplatesSlice';
import { URLS, ASYNC } from '@/js/react/vars';
import { Empty } from '@/js/react/components/Empty';


const defaultTemplate = {
    en: (`Dear brother/sister {name}, I want to express my wish to see you on my special wedding day, which will be on 2020-10-01 14:08 at the Les Victorieux room, and this is why I am sending you this message. I look forward to seeing you on the day I tie the knot because the ceremony will be a little less complete without you. I love you!\nYour invitation code is: {code}\n {url} use this link, if you want your code in picture.`).trim(),
    fr: (`Cher frère / sœur {name}, je veux vous exprimer mon souhait de vous voir le jour de mon mariage spécial, qui sera au date du 2020-10-01 14:08 à la salle Les Victorieux, et c'est pourquoi je vous envoie ce message. J'ai hâte de vous voir le jour où je me marierai car la cérémonie sera un peu moins complète sans vous. Je t'aime!\nVotre code d'invitation est: {code}\n{url} utiliser ce lien, si vous voulez votre code en image.`).trim()
}

const TEMPLATE_SECTION = {
    sms: 'sms',
    whatsapp: 'whatsapp'
}

/**
 * @param { { src: string, alt: string } } param0 
 */
const ImgIcon = ({ src, alt }) => <img src={src} className="checkbox-icon" alt={alt} width="20" height="20" />

/**
 * @param {{  onChange: any, icon?: boolean }} param0 
 */
const SectionView = ({ onChange, icon = true }) => {
    const { t } = useTranslation();
    return <div className="mb-3">
        <div className="custom-control custom-radio custom-control-inline">
            <input type="radio" id="sms" defaultChecked onChange={onChange} name="message_view" value={TEMPLATE_SECTION.sms} className="custom-control-input" />
            <label className="custom-control-label" htmlFor="sms">
                {icon && <ImgIcon src="/img/svg/sms.svg" alt="SMS" />} {t('SMS')}
            </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
            <input type="radio" id="whatsapp" onChange={onChange} name="message_view" value={TEMPLATE_SECTION.whatsapp} className="custom-control-input" />
            <label className="custom-control-label" htmlFor="whatsapp">
                {icon && <ImgIcon src="/img/svg/whatsapp.svg" alt="WhatsApp" />}  {t('WhatsApp')}
            </label>
        </div>
    </div>
}


/**
 * @param {{  section: string  }} param0 
 */
const SmsDetail = ({ section }) => {
    const { t } = useTranslation();
    return <ul id="sms-counter" className={section != TEMPLATE_SECTION.sms ? 'd-none' : ''}>
        <li>{t('sms')}: <span className="messages"></span></li>
        <li>{t('Par sms')}: <span className="per_message"></span></li>
        <li>{t('Restant')}: <span className="remaining"></span></li>
    </ul>
}

/**
 * @param { string } section 
 * @param { { sms: string, whatsapp: string }} textValue 
 */
const caseSectionValue = (section, textValue) => {
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


const TextareaFieldAndDetail = () => {
    const { t } = useTranslation();
    /**
    * @type { { sms: string, whatsapp: string }} 
    */
    // @ts-ignore
    const templateTextarea = useSelector(state => state.productTemplateEdit)
    const dispche = useDispatch()

    const [section, setSection] = useState(TEMPLATE_SECTION.sms)

    const handleSection = useCallback(({ target: { value } }) => {
        setSection(value)
    }, [setSection])
    const [textValue, setTextValue] = useState({
        sms: '',
        whatsapp: ''
    })
    const datasRefTextValue = useRef(textValue)

    /**
     * @param { { sms: string, whatsapp: string }} sct 
     * @param { string } value 
     */
    const caseSection = (sct, value) => {
        let y = {
            sms: '',
            whatsapp: ''
        }
        switch (section) {
            case TEMPLATE_SECTION.sms:
                y = { sms: value, whatsapp: sct.whatsapp }
                break;
            case TEMPLATE_SECTION.whatsapp:
                y = { sms: sct.sms, whatsapp: value }
                break;
            default:
                break;
        }
        return { ...y }
    }

    /**
     * @param {React.ChangeEvent<HTMLTextAreaElement>} param0 
     */
    const handleTextChange = ({ target: { value } }) => {
        setTextValue(k => {
            return caseSection(k, value)
        })
    }

    const handleKeyUp = () => {
        datasRefTextValue.current = textValue
    }

    useEffect(() => {
        const v = templateTextarea
        if (v.sms || v.whatsapp) {
            setTextValue({ sms: v.sms, whatsapp: v.whatsapp })
        } else {
            const defaultValues = Localize(defaultTemplate)
            setTextValue({ sms: defaultValues, whatsapp: defaultValues })
        }

        const time = setTimeout(() => {
            // @ts-ignore
            $('#message').countSms('#sms-counter')
        }, 500)
        return () => {
            dispche(setTemplateTextAreaValue(datasRefTextValue.current))
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
                    name="description" className="form-control text-default"
                    rows={8}></textarea>
            </div>
        </div>
    </>
}

const TemplateNameField = () => {
    const { t } = useTranslation();
    const nameField = useRef(null)
    const dispache = useDispatch()
    // @ts-ignore
    const { templatename } = useSelector(s => s.productTemplateEdit)

    useEffect(() => {
        if (nameField.current) {
            nameField.current.value = templatename
        }
        return () => {
            dispache(setTemplateNameValue(nameField.current.value))
        }
    }, [])

    return <div className="form-group">
        <div className="input-group input-group-merge">
            <input
                ref={nameField}
                className="form-control" name="event_guest"
                placeholder={t("Mom du modèle")} type="text" required />
        </div>
    </div>
}

/**
 * @param {{ 
 *      item: { id: number, name: string, sms: number, text: { sms: string, whatsapp: string }, show?: boolean }  
 *   }} param0 
 */
const ListDescriptionText = ({ item }) => {
    const { t } = useTranslation()
    const [section, setSection] = useState(TEMPLATE_SECTION.sms)
    const handleSection = useCallback(({ target: { value } }) => {
        setSection(value)
    }, [setSection])

    return <>
        {item.show ? (
            <div className="row">
                <div className="col">
                    <SectionView onChange={handleSection} icon={false} />
                </div>
                <div className="col-auto">
                    <button type="button" className="btn btn-secondary btn-sm text-primary">{t('Modifier')}</button>
                    <button type="button" className="btn btn-secondary btn-sm text-danger">{t('Supprimer')}</button>
                </div>
            </div>
        ) : ''}
        <p className="text-sm mb-0">
            {item.show ? caseSectionValue(section, item.text) : caseSectionValue(section, item.text).slice(0, 101)}
        </p>
    </>
}

const List = ({
    Ul: ({ children }) => {
        return <div className="list-group list-group-flush">{children}</div>
    },
    /**
     * @param {{  data: Array<{ id: number, name: string, sms: number, text: { sms: string, whatsapp: string } }> }} param0
     */
    Li: ({ data = [] }) => {
        const [datas, setDatas] = useState(data)
        const { t } = useTranslation()
        useEffect(() => {
            setDatas(d => d.map(g => ({ ...g, show: false })))
        }, [])
        /**
         * @param {number} id 
         */
        const showItem = (id) => setDatas(d => d.map(g => ({ ...g, show: id === g.id })))
        return <>
            {datas.map(v => {
                return <a href="javascript:;" key={v.id} onClick={() => showItem(v.id)} className="list-group-item list-group-item-action flex-column align-items-start py-4 px-4">
                    <div className="d-flex w-100 justify-content-between">
                        <h4 className="mb-1">{v.name}</h4>
                        <small>{t('SMS')} {v.sms}</small>
                    </div>
                    <ListDescriptionText item={v} />
                </a>
            })}
        </>
    }
})

const TemplatesList = () => {
    const { t } = useTranslation()
    /**
     * @type { { ids: Array, entities: Object, loading: string, error: Object} }
     */
    // @ts-ignore
    const { ids, entities, loading } = useSelector(s => s.eventTemplates)
    const dispache = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispache(fetchEventTemplates(URLS.eventTemplates))
    }, [])
    const datas = ids.map(k => entities[k])
    const content = <List.Ul>
        <List.Li data={datas} />
    </List.Ul>

    return <>
        {/* @ts-ignore */}
        {loading === ASYNC.pending ? <skeleton-box height="50" lines="3" /> : ''}
        {loading === ASYNC.idle && !ids.length ? (<div className="mt-5">
            <Empty message={t('Aucun modèle enregistré!')} />
        </div>) : ''}
        {loading === ASYNC.idle && ids.length ? content : ''}
    </>
}

const Templates = () => {
    const { t } = useTranslation();
    return <>
        <Help />
        <div className="row">
            <div className="col-lg-6">
                <hr className="my-2" />
            </div>
            <div className="col-lg-6">
                <hr className="my-2" />
            </div>
        </div>
        <div className="row justify-content-start">
            <div className="col-lg-6">
                <form action="" method="post" autoComplete="off">
                    <TemplateNameField />
                    <TextareaFieldAndDetail />
                    <DefaultButton label={t('Enregister')} />
                </form>
            </div>
            <div className="col-lg-6">
                <TemplatesList />
            </div>
        </div>
    </>
}

export default Templates