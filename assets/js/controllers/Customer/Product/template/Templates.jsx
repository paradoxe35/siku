//@ts-check
import React, { useEffect, useCallback, useState, useRef, useMemo } from 'react'
import { useTranslation } from "react-i18next";
import Help from './Help';
import { Localize } from '@/js/functions/localize';
import { DefaultButton } from '@/js/react/components/Buttons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTemplateTextAreaValue, setTemplateNameValue, fetchEventTemplates, eventTemplateAdded, eventTemplateRemoved } from '@/js/store/features/product/TemplatesSlice';
import { URLS, ASYNC, OverFlowStyle } from '@/js/react/vars';
import { Empty } from '@/js/react/components/Empty';
import RowDivider from '@/js/react/components/RowDivider';
import ModalConfirm from '@/js/react/components/ModalConfirm';
import { caseSection, KeysRequiredInText, List, ListDescriptionText, smsCount, TextAreatEdit, toHtml, useItemDeletion, useSectionText, validateTemplate } from './Sections';
import { useFetch } from '@/js/react/hooks';
import store from '@js/store'
import { Loader } from '@/js/react/components/Loader';
import CustomCheckbox from '@/js/react/components/CustomCheckbox';

const { event_date } = store.getState().workingEvent

const defaultTemplate = {
    en: (`Dear brother/sister {name},\nI want to express my wish to see you on my special wedding day, which will be on ${event_date} at the Les Victorieux room, and this is why I am sending you this message. I look forward to seeing you on the day I tie the knot because the ceremony will be a little less complete without you. I love you!\nYour invitation code is: {code}.\n{url} use this link, if you want your code in picture.`).trim(),
    fr: (`Cher frère / sœur {name},\nje veux vous exprimer mon souhait de vous voir le jour de mon mariage spécial, qui sera au date du ${event_date} à la salle Les Victorieux, et c'est pourquoi je vous envoie ce message. J'ai hâte de vous voir le jour où je me marierai car la cérémonie sera un peu moins complète sans vous. Je t'aime!\nVotre code d'invitation est: {code}.\n{url} utiliser ce lien, si vous voulez votre code en image.`).trim()
}


const NEW_TEMPLATE_FORM = {
    description: 'description',
    name: 'name',
    sms_total: 'sms_total',
    per_sms: 'per_sms',
    text_sms: 'text_sms',
    text_mail: 'text_mail',
    global: 'global'
}


const TextareaFieldAndDetail = ({ templateRef }) => {
    /**
    * @type { { sms: string, mail: string }} 
    */
    // @ts-ignore
    const templateTextarea = useSelector(state => state.productTemplateEdit)
    const dispatch = useDispatch()

    const { section, handleSection } = useSectionText()

    const defaultV = useMemo(() => {
        return Localize(defaultTemplate)
    }, [defaultTemplate, Localize])

    const [textValue, setTextValue] = useState(!templateTextarea.sms ? {
        sms: defaultV,
        mail: toHtml(defaultV)
    } : templateTextarea)

    const values = useRef(textValue)

    useEffect(() => {
        values.current = textValue
        templateRef.current = textValue
    }, [textValue])

    /**
     * @param {React.ChangeEvent<HTMLTextAreaElement>} param0 
     */
    const handleTextChange = useCallback(({ target: { value } }) => {
        setTextValue(k => caseSection(section, k, value))
    }, [setTextValue, caseSection, section])

    useEffect(() => {
        return () => {
            dispatch(setTemplateTextAreaValue(values.current))
        }
    }, [])

    return <>
        <TextAreatEdit
            section={section}
            handleTextChange={handleTextChange}
            handleKeyUp={null}
            textValue={textValue}
            name={NEW_TEMPLATE_FORM.description}
            handleSection={handleSection} />
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
    * @type { { current: { sms: string, mail: string } } } 
    */
    // @ts-ignore
    const templateRef = useRef(null)

    /**
     * @param { React.FormEvent<HTMLFormElement> } e 
     */
    const handleSubmittion = async (e) => {
        const { current: templateTextarea } = templateRef

        e.preventDefault()
        if (!validateTemplate(templateTextarea, requiredKeys)) return

        const smsMeta = smsCount(templateTextarea.sms)
        // @ts-ignore
        const form = new FormData(formElement.current)
        form.append(NEW_TEMPLATE_FORM.per_sms, smsMeta.per_message.toString())
        form.append(NEW_TEMPLATE_FORM.sms_total, smsMeta.messages.toString())
        form.append(NEW_TEMPLATE_FORM.text_sms, templateTextarea.sms)
        form.append(NEW_TEMPLATE_FORM.text_mail, templateTextarea.mail)

        fetchAPi('post', URLS.eventTemplatesStore, form, true)
            .then(({ data: { data } }) => dispatch(eventTemplateAdded(data)))
            .finally(() => {
                formElement.current.querySelector(`[name=${NEW_TEMPLATE_FORM.name}]`)
                    .value = ''
            })
    }

    return <form ref={formElement} method="post" onSubmit={handleSubmittion} autoComplete="off">
        <TemplateNameField />
        <TextareaFieldAndDetail templateRef={templateRef} />
        <div className="is-global mb-2">
            <div className="text-xs text-muted mt-3 mb-2">
                {t("Cochez cette case si vous souhaitez l'enregistrer en tant que modèle global pour vos événements")}.
            </div>
            <CustomCheckbox name={NEW_TEMPLATE_FORM.global} label={t('Global')} />
        </div>
        <DefaultButton loading={loading} type="submit" label={t('Enregistrer')} />
    </form>
}

const ShowListTemplate = ({ v, handleDelete }) => {
    const { t } = useTranslation()

    return <>
        <div className="d-flex w-100 justify-content-between" >
            <h4 className="mb-1">{v.name}</h4>
            <small>
                {v.global && <span>({t('Global')}) </span>}
                {t('SMS')} {v.sms}
            </small>
        </div>
        <ListDescriptionText item={v} onDelete={handleDelete} />
    </>
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

    const datas = useMemo(() => ids.map(k => entities[k]), [entities])

    return <>
        <Loader loading={loading == ASYNC.pending}>
            {
                loading == ASYNC.idle && !!ids.length &&
                <>
                    <div style={OverFlowStyle}>
                        <List.Ul>
                            <List.Li data={datas}>
                                {v => <ShowListTemplate v={v} handleDelete={handleDelete} />}
                            </List.Li>
                        </List.Ul>
                    </div>
                    <ModalConfirm loading={deletionLoading} onConfirm={deleteItem} ref={modalConfirm} />
                </>
            }
            {
                loading == ASYNC.idle && !ids.length &&
                <div className="mt-5">
                    <Empty message={t('Aucun modèle enregistré!')} />
                </div>
            }
        </Loader>
    </>
}


const Templates = () => {
    return <>
        <Help />
        <div className="row justify-content-start">
            <div className="col-lg-7">
                <RowDivider />
                <NewTemplate />
            </div>
            <div className="col-lg-5">
                <RowDivider />
                <TemplatesList />
            </div>
        </div>
    </>
}

export default Templates