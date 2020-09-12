//@ts-check
import React, { useEffect, useCallback, useState, useRef, useMemo } from 'react'
import { useTranslation } from "react-i18next";
import Help from './Help';
import { Localize } from '@/js/functions/localize';
import { DefaultButton } from '@/js/react/components/Buttons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTemplateTextAreaValue, setTemplateNameValue, fetchEventTemplates, eventTemplateAdded, eventTemplateRemoved } from '@/js/store/features/product/TemplatesSlice';
import { URLS, ASYNC } from '@/js/react/vars';
import { Empty } from '@/js/react/components/Empty';
import { Notifier } from '@/js/functions/notifier';
import { ApiRequest } from '@/js/api/api';
import RowDivider from '@/js/react/components/RowDivider';
import ModalConfirm from '@/js/react/components/ModalConfirm';
import { caseSection, caseSectionValue, KeysRequiredInText, SectionView, TEMPLATE_SECTION, TextAreatEdit, useSectionText } from './Sections';


const defaultTemplate = {
    en: (`Dear brother/sister {name}, I want to express my wish to see you on my special wedding day, which will be on 2020-10-01 14:08 at the Les Victorieux room, and this is why I am sending you this message. I look forward to seeing you on the day I tie the knot because the ceremony will be a little less complete without you. I love you!\nYour invitation code is: {code}\n {url} use this link, if you want your code in picture.`).trim(),
    fr: (`Cher frère / sœur {name}, je veux vous exprimer mon souhait de vous voir le jour de mon mariage spécial, qui sera au date du 2020-10-01 14:08 à la salle Les Victorieux, et c'est pourquoi je vous envoie ce message. J'ai hâte de vous voir le jour où je me marierai car la cérémonie sera un peu moins complète sans vous. Je t'aime!\nVotre code d'invitation est: {code}\n{url} utiliser ce lien, si vous voulez votre code en image.`).trim()
}


const NEW_TEMPLATE_FORM = {
    description: 'description',
    name: 'name',
    sms_total: 'sms_total',
    per_sms: 'per_sms',
    text_sms: 'text_sms',
    text_whatsapp: 'text_whatsapp'
}


const TextareaFieldAndDetail = () => {
    /**
    * @type { { sms: string, whatsapp: string }} 
    */
    // @ts-ignore
    const templateTextarea = useSelector(state => state.productTemplateEdit)
    const dispche = useDispatch()

    const { section, handleSection } = useSectionText()

    const defaultV = useMemo(() => {
        return Localize(defaultTemplate)
    }, [defaultTemplate, Localize])

    const [textValue, setTextValue] = useState(!templateTextarea.sms ? {
        sms: defaultV,
        whatsapp: defaultV
    } : templateTextarea)

    /**
     * @param {React.ChangeEvent<HTMLTextAreaElement>} param0 
     */
    const handleTextChange = useCallback(({ target: { value } }) => {
        setTextValue(k => caseSection(section, k, value))
    }, [setTextValue, caseSection, section])

    const handleKeyUp = useCallback(() => {
        dispche(setTemplateTextAreaValue(textValue))
    }, [textValue, dispche, setTemplateTextAreaValue])

    useEffect(() => {
        handleKeyUp()
    }, [])

    return <TextAreatEdit
        section={section}
        handleTextChange={handleTextChange}
        handleKeyUp={handleKeyUp}
        textValue={textValue}
        name={NEW_TEMPLATE_FORM.description}
        handleSection={handleSection} />
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
                className="form-control"
                name={NEW_TEMPLATE_FORM.name}
                placeholder={t("Mom du modèle")} type="text" required />
        </div>
    </div>
}

const NewTemplate = () => {
    const requiredKeys = KeysRequiredInText
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const formElement = useRef(null)

    /**
    * @type { { sms: string, whatsapp: string }} 
    */
    // @ts-ignore
    const templateTextarea = useSelector(state => state.productTemplateEdit)

    /**
     * @param { React.FormEvent<HTMLFormElement> } e 
     */
    const handleSubmittion = async (e) => {
        e.preventDefault()
        if (!validateTemplate(templateTextarea, requiredKeys)) return
        setLoading(true)
        /**
         * @type {{encoding: string, length: number, per_message: number, remaining: number, messages: number}}
         */
        // @ts-ignore
        const smsMeta = SmsCounter.count(templateTextarea.sms)
        // @ts-ignore
        const form = new FormData(formElement.current)
        form.append(NEW_TEMPLATE_FORM.per_sms, smsMeta.per_message.toString())
        form.append(NEW_TEMPLATE_FORM.sms_total, smsMeta.messages.toString())
        form.append(NEW_TEMPLATE_FORM.text_sms, templateTextarea.sms)
        form.append(NEW_TEMPLATE_FORM.text_whatsapp, templateTextarea.whatsapp)

        ApiRequest('post', URLS.eventTemplatesStore, form, true)
            .then(({ data: { data } }) => dispatch(eventTemplateAdded(data)))
            .finally(() => {
                formElement.current.querySelector(`[name=${NEW_TEMPLATE_FORM.name}]`)
                    .value = ''
                setLoading(false)
            })
    }

    return <form ref={formElement} method="post" onSubmit={handleSubmittion} autoComplete="off">
        <TemplateNameField />
        <TextareaFieldAndDetail />
        <DefaultButton loading={loading} type="submit" label={t('Enregister')} />
    </form>
}

/**
 * @param {{ 
 *      item: { id: number, name: string, sms: number, text: { sms: string, whatsapp: string }, show?: boolean },
 *      onDelete?: (id: number) => void 
 *   }} param0 
 */
const ListDescriptionText = ({ item, onDelete }) => {
    const { t } = useTranslation()
    const { handleSection, section } = useSectionText()

    return <>
        {item.show ? (
            <div className="row mt-3" onClick={e => e.stopPropagation()}>
                <div className="col">
                    <SectionView onChange={handleSection} icon={false} name={'template_view-' + item.id} />
                </div>
                <div className="col-auto">
                    <button type="button" onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                    }} className="btn btn-secondary btn-sm text-danger">{t('Supprimer')}</button>
                </div>
            </div>
        ) : ''}
        <p className="text-sm mb-0">
            {item.show ? caseSectionValue(section, item.text) : caseSectionValue(section, item.text).slice(0, 101) + '...'}
        </p>
    </>
}


const List = ({
    Ul: ({ children }) => {
        return <div className="list-group list-group-flush">{children}</div>
    },
    /**
     * @param {{  
     *  data: Array<{ id: number, name: string, sms: number, text: { sms: string, whatsapp: string }, show?: boolean }>,
     *  onDelete?: (id: number) => void 
     * }} param0
     */
    Li: ({ data, onDelete }) => {
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
                return <a key={v.id} onClick={(e) => showItem(v.id, e)} className="list-group-item clickable-a list-group-item-action flex-column align-items-start py-4 px-4">
                    <div className="d-flex w-100 justify-content-between" >
                        <h4 className="mb-1">{v.name}</h4>
                        <small>{t('SMS')} {v.sms}</small>
                    </div>
                    <ListDescriptionText item={v} onDelete={onDelete} />
                </a>
            })}
        </>
    }
})


const TemplatesList = () => {
    const { t } = useTranslation()
    const modalConfirm = useRef(null)
    const [deletionLoading, setDeletionLoading] = useState(false)
    const [deletionId, setDeletionId] = useState(null)
    /**
     * @type { { ids: Array, entities: Object, loading: string, error: Object} }
     */
    // @ts-ignore
    const { ids, entities, loading } = useSelector(s => s.eventTemplates)
    const dispach = useDispatch()
    useEffect(() => {
        // @ts-ignore
        dispach(fetchEventTemplates(URLS.eventTemplates))
    }, [])

    // delete event template
    const handleDelete = useCallback(async (id) => {
        setDeletionId(id)
        if (modalConfirm.current)
            $(modalConfirm.current).modal('show');
    }, [modalConfirm.current, setDeletionId])

    const deleteItem = useCallback(() => {
        if (!deletionId) return
        setDeletionLoading(true)
        ApiRequest('delete', URLS.eventTemplates + '/' + deletionId, {}, true)
            .finally(() => {
                $(modalConfirm.current).modal('hide')
                setDeletionLoading(false)
                setDeletionId(null)
            })
            .then(() => dispach(eventTemplateRemoved(deletionId)))
    }, [deletionId]);
    // delete event template

    const datas = ids.map(k => entities[k])

    return <>
        {loading == ASYNC.idle && ids.length ? (
            <>
                <List.Ul>
                    <List.Li data={datas} onDelete={handleDelete} />
                </List.Ul>
                <ModalConfirm loading={deletionLoading} onConfirm={deleteItem} ref={modalConfirm} />
            </>
        ) : ''}
        {/* @ts-ignore */}
        {loading == ASYNC.pending ? <skeleton-box height="50" lines="3" /> : ''}
        {loading == ASYNC.idle && !ids.length ? (
            <div className="mt-5">
                <Empty message={t('Aucun modèle enregistré!')} />
            </div>
        ) : ''}

    </>
}

/**
 * @returns { boolean }
 */
const validateTemplate = (templateTextarea, requiredKeys) => {
    const sms = requiredKeys.filter(k => templateTextarea.sms.indexOf(k) < 0)
    const whatsapp = requiredKeys.filter(k => templateTextarea.whatsapp.indexOf(k) < 0)
    if (sms.length) {
        Notifier.error(sms.join(', ') + Localize({
            fr: ' est / sont requis dans vos modèles sms text',
            en: 'is / are required in your text sms templates'
        }))
    }
    if (whatsapp.length) {
        Notifier.error(whatsapp.join(', ') + Localize({
            fr: ' est / sont requis dans vos modèles whatsapp text',
            en: 'is / are required in your text whatsapp templates'
        }))
    }
    return (!sms.length && !whatsapp.length)
}



const Templates = () => {
    return <>
        <Help />
        <div className="row justify-content-start">
            <div className="col-lg-6">
                <RowDivider />
                <NewTemplate />
            </div>
            <div className="col-lg-6">
                <RowDivider />
                <TemplatesList />
            </div>
        </div>
    </>
}

export default Templates