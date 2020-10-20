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
import RowDivider from '@/js/react/components/RowDivider';
import ModalConfirm from '@/js/react/components/ModalConfirm';
import { caseSection, KeysRequiredInText, List, ListDescriptionText, smsCount, TextAreatEdit, useItemDeletion, useSectionText, validateTemplate } from './Sections';
import { SkeletonBox } from '@/js/react/components/SkeletonBox';
import { useFetch } from '@/js/react/hooks';
import store from '@js/store'

const { event_date } = store.getState().workingEvent

const defaultTemplate = {
    en: (`Dear brother/sister {name}, I want to express my wish to see you on my special wedding day, which will be on ${event_date} at the Les Victorieux room, and this is why I am sending you this message. I look forward to seeing you on the day I tie the knot because the ceremony will be a little less complete without you. I love you!\nYour invitation code is: {code}.\n {url} use this link, if you want your code in picture.`).trim(),
    fr: (`Cher frère / sœur {name}, je veux vous exprimer mon souhait de vous voir le jour de mon mariage spécial, qui sera au date du ${event_date} à la salle Les Victorieux, et c'est pourquoi je vous envoie ce message. J'ai hâte de vous voir le jour où je me marierai car la cérémonie sera un peu moins complète sans vous. Je t'aime!\nVotre code d'invitation est: {code}.\n {url} utiliser ce lien, si vous voulez votre code en image.`).trim()
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
    const dispatch = useDispatch()
    const formElement = useRef(null)
    const { fetchAPi, fetchLoading: loading } = useFetch()


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

        const smsMeta = smsCount(templateTextarea.sms)
        // @ts-ignore
        const form = new FormData(formElement.current)
        form.append(NEW_TEMPLATE_FORM.per_sms, smsMeta.per_message.toString())
        form.append(NEW_TEMPLATE_FORM.sms_total, smsMeta.messages.toString())
        form.append(NEW_TEMPLATE_FORM.text_sms, templateTextarea.sms)
        form.append(NEW_TEMPLATE_FORM.text_whatsapp, templateTextarea.whatsapp)

        fetchAPi('post', URLS.eventTemplatesStore, form, true)
            .then(({ data: { data } }) => dispatch(eventTemplateAdded(data)))
            .finally(() => {
                formElement.current.querySelector(`[name=${NEW_TEMPLATE_FORM.name}]`)
                    .value = ''
            })
    }

    return <form ref={formElement} method="post" onSubmit={handleSubmittion} autoComplete="off">
        <TemplateNameField />
        <TextareaFieldAndDetail />
        <DefaultButton loading={loading} type="submit" label={t('Enregister')} />
    </form>
}


const TemplatesList = () => {
    const { t } = useTranslation()
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

    const {
        deletionId,
        setDeletionLoading,
        modalConfirm,
        closeModal,
        handleDelete,
        deletionLoading
    } = useItemDeletion()

    const { ApiRequest } = useFetch()

    const deleteItem = useCallback(() => {
        if (!deletionId) return
        setDeletionLoading(true)
        ApiRequest('delete', URLS.eventTemplates + '/' + deletionId, {}, true)
            .finally(() => closeModal())
            .then(() => dispach(eventTemplateRemoved(deletionId)))
    }, [deletionId]);
    // delete event template

    const datas = ids.map(k => entities[k])

    return <>
        {loading == ASYNC.idle && ids.length ? (
            <>
                <List.Ul>
                    <List.Li data={datas}>
                        {v => <>
                            <div className="d-flex w-100 justify-content-between" >
                                <h4 className="mb-1">{v.name}</h4>
                                <small>{t('SMS')} {v.sms}</small>
                            </div>
                            <ListDescriptionText item={v} onDelete={handleDelete} />
                        </>}
                    </List.Li>
                </List.Ul>
                <ModalConfirm loading={deletionLoading} onConfirm={deleteItem} ref={modalConfirm} />
            </>
        ) : ''}
        {loading == ASYNC.pending ? <SkeletonBox height="50" lines="3" /> : ''}
        {loading == ASYNC.idle && !ids.length ? (
            <div className="mt-5">
                <Empty message={t('Aucun modèle enregistré!')} />
            </div>
        ) : ''}

    </>
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