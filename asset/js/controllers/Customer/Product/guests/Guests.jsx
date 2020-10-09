//@ts-check
import React, { Fragment, useEffect, useRef, useCallback, useState, useMemo } from 'react'
import { useTranslation } from "react-i18next";
import Help from './Help';
import RowDivider from '@/js/react/components/RowDivider';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchEventTemplates } from '@/js/store/features/product/TemplatesSlice';
import { DispachEventOpenGuestSocketDetail, DispachEventProcessQueueDetail, DispachGuestsDetail, Event_Guests_Name, TEMPLATE_SECTION, URLS } from '@/js/react/vars';
import { slim as slimSelect } from '@js/utils/SlimSelect'
import { InputField } from '@/js/react/components/InputField';
import { DefaultButton } from '@/js/react/components/Buttons';
import PhoneInput from '@/js/react/components/PhoneInput';
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import ModalConfirm from '@/js/react/components/ModalConfirm';
import {
    caseSection,
    caseSectionValue,
    KeysRequiredInText,
    SectionView,
    smsCount,
    TextAreatEdit,
    useSectionText,
    validateTemplateSms,
    validateTemplateWhatsapp
} from '../template/Sections';
import CustomCheckbox from '@/js/react/components/CustomCheckbox';
import { Empty } from '@/js/react/components/Empty';
import { Notifier } from '@/js/functions/notifier';
import { useFetch, useFullLoading, usePhoneInput } from '@/js/react/hooks';
import { FullLoader } from '@/js/react/components/FullLoader';
import { putEventStatus } from '@/js/store/features/product/EventStatusSlice';
import { SkeletonBox } from '@/js/react/components/SkeletonBox';
import { GuestList } from './GuestList';
import { ServiceUse } from './ServiceUse';
import { SYMBOL } from '@/js/functions/functions';

const SERVICES = {
    ...TEMPLATE_SECTION,
    qrcode: 'qrcode'
}

const NEW_GUEST_FORM = {
    name: 'name',
    phone: 'phone',
    template_id: 'template_id',
    autorized: 'autorized',
    text_sms: 'text_sms',
    text_whatsapp: 'text_whatsapp',
    qrcode: 'qrcode',
    can_send: 'can_send',
    can_send_sms: 'can_send_sms',
    can_send_whatsapp: 'can_send_whatsapp',
    can_include_qrcode: 'can_include_qrcode',
    sms_total: 'sms_total',
    country_code: 'country_code',
    country_call: 'country_call'
}

const QrcodeCase = () => {
    const { t } = useTranslation();
    return <div className="qr---case">
        <div className="text-xs text-muted mt-3 mb-2">
            {t('Cocher cette case si vous souhaitez que le code d\'invitation en image Qr code soit inclus dans le message')}.
        </div>
        <CustomCheckbox name={NEW_GUEST_FORM.can_include_qrcode} label={t('Qr code Image')} />
    </div>
}

const ModalViewText = ({ textValues }) => {
    const { handleSection, section } = useSectionText()
    return <div>
        <div className="row mt-3">
            <div className="col">
                <SectionView onChange={handleSection} icon={true} name="gues-text-view" />
            </div>
        </div>
        <p className="text-sm mb-0">
            {caseSectionValue(section, textValues)}
        </p>
    </div>
}

const ModalEditText = ({ setTextValues, textValues }) => {
    const { section, handleSection } = useSectionText()
    /**
     * @param {React.ChangeEvent<HTMLTextAreaElement>} param0 
     */
    const handleTextChange = useCallback(({ target: { value } }) => {
        setTextValues(k => caseSection(section, k, value))
    }, [setTextValues, caseSection, section])

    return <TextAreatEdit
        section={section}
        handleTextChange={handleTextChange}
        handleKeyUp={null}
        textValue={textValues}
        name="guest-text-edit"
        handleSection={handleSection} />
}

/**
 * @param { { disabledTextField: boolean, services: Array<string>, textValues: Object, phone: string } } param0 
 */
const EstimatePrice = ({ disabledTextField, services, textValues, phone }) => {
    const { t } = useTranslation()
    const [prices, setPrices] = useState(null)
    const { fetchLoading: loading, fetchAPi } = useFetch()


    const onClick = useCallback(() => {
        if (disabledTextField) return
        const dataPhone = parsePhoneNumber(phone)
        // @ts-ignore
        const sms = smsCount(textValues[SERVICES.sms])
        fetchAPi('get', `${URLS.countryPricing}?country_code=${dataPhone.country}`, {}, true)
            .then(({ data: { prices: { sms: smsPrice, whatsapp } } }) => {
                const p = ((+smsPrice) * +(sms.messages))
                setPrices({
                    // @ts-ignore
                    sms: !isNaN(p) ? p.nround(3) : null,
                    whatsapp
                })
            })
    }, [services, textValues, phone, disabledTextField])

    const price = (v) => v !== null && !isNaN(v) ? `${SYMBOL + v}` : t('Indisponible')

    return <>
        <DefaultButton
            disabled={disabledTextField}
            onClick={onClick}
            loading={loading}
            textColor="text-primary ml-3"
            color='secondary' label={t('Estimer Prix')} />
        <br /><br />
        {prices && (
            <>
                {
                    services.includes(SERVICES.sms) &&
                    <p>{t('SMS')}: {price(prices.sms)} </p>
                }
                {
                    services.includes(SERVICES.whatsapp) &&
                    <p>{t('WhatsApp')}: {price(prices.whatsapp)} </p>
                }
            </>
        )}
    </>
}

const CreateNewGuest = () => {
    const { t } = useTranslation();
    const templatesEl = useRef(null)
    const slimInstance = useRef(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [services, setServices] = useState([])
    const { phone, onPhoneValueChange } = usePhoneInput()

    const [fields, setFields] = useState({
        [NEW_GUEST_FORM.name]: '',
        [NEW_GUEST_FORM.autorized]: '1',
    })

    const INIT_V = {
        sms: '',
        whatsapp: ''
    }

    const [textValues, setTextValues] = useState(INIT_V)

    const finalTextValue = useRef(INIT_V)

    /**
     * @type { { ids: Array, entities: Object<string, 
     *      { id: string, sms: string, name: string, text: { sms: string, whatsapp: string } } 
     *  >, loading: string, error: Object} }
     */
    // @ts-ignore
    const { ids, entities } = useSelector(s => s.eventTemplates)
    const dispach = useDispatch()

    /**
     * @returns { import('slim-select').default }
     */
    const getSlim = () => {
        if (slimInstance.current === null) {
            // @ts-ignore
            slimInstance.current = slimSelect(templatesEl.current, {
                showSearch: false,
            });
        }
        return slimInstance.current;
    }

    useEffect(() => {
        // @ts-ignore
        dispach(fetchEventTemplates(URLS.eventTemplates))
        return () => {
            getSlim().destroy()
        }
    }, [])

    /**
     * @param { import('slim-select/dist/data').Option } info 
     */
    const updateTextValue = (info) => {
        setSelectedTemplate(info.value)
        setTextValues(entities[info.value].text)
    }

    useEffect(() => {
        const slim = getSlim()
        const datas = ids.map((id) => {
            const entity = entities[id]
            return {
                text: entity.name,
                value: entity.id,
                selected: false
            }
        })
        slim.setData([{ text: t('Choissez un modèle'), value: '#', selected: true }, ...datas])
        slim.onChange = (info) => {
            const h = info.value && info.value != '#' && ids.includes(+info.value)
            !h && setSelectedTemplate(null)
            h && updateTextValue(info);
        }
    }, [ids])


    const onChangeServices = useCallback((v) => {
        setServices(v)
    }, [setServices])

    const onChangeField = useCallback(
        /** @param {React.ChangeEvent<HTMLInputElement>} param0 */
        ({ target: { name, value } }) => {
            setFields(f => ({ ...f, [name]: value }))
        }, [setFields])


    const validField = useMemo(() => {
        return isValidPhoneNumber(phone) &&
            fields[NEW_GUEST_FORM.name].trim().length > 1
    }, [fields, phone])

    const disabledTextField = !selectedTemplate || !services.length || !validField

    const VIEWS_MODAL = {
        view: 'view',
        edit: 'edit'
    }

    const modalRef = useRef(null)

    const [indexModalView, setIndexModalView] = useState(VIEWS_MODAL.view)

    const editText = () => {
        if (disabledTextField) return
        setIndexModalView(VIEWS_MODAL.edit)
        $(modalRef.current).modal('show')
    }

    const viewText = () => {
        if (disabledTextField) return
        setIndexModalView(VIEWS_MODAL.view)
        $(modalRef.current).modal('show')
    }

    const modalViews = useMemo(() => {
        const guestNmae = fields[NEW_GUEST_FORM.name];
        const values = { ...INIT_V }
        Object.keys(textValues)
            .forEach((k) => {
                const text = textValues[k]
                values[k] = text.replace(KeysRequiredInText[0], guestNmae)
            })
        finalTextValue.current = values
        return {
            [VIEWS_MODAL.edit]: <ModalEditText setTextValues={setTextValues} textValues={values} />,
            [VIEWS_MODAL.view]: <ModalViewText textValues={values} />
        }
    }, [setTextValues, textValues, fields[NEW_GUEST_FORM.name]])

    const { fetchLoading: onSave, fetchAPi } = useFetch()
    /**
     * @param { React.FormEvent<HTMLFormElement> } e 
     */
    const saveGuest = (e) => {
        e.preventDefault()
        if (disabledTextField) return

        const { target } = e
        const keys = KeysRequiredInText
        const vsms = services.includes(SERVICES.sms)
        const vwhatsapp = services.includes(SERVICES.whatsapp)

        if (vsms && !validateTemplateSms(finalTextValue.current, [keys[1]])) {
            return
        }

        if (vwhatsapp && !validateTemplateWhatsapp(finalTextValue.current, [keys[1]])) {
            return
        }

        const text = finalTextValue.current
        const countSms = smsCount(text.sms)
        const dataPhone = parsePhoneNumber(phone)
        // @ts-ignore
        const form = new FormData(target)
        form.append(NEW_GUEST_FORM.text_sms, text.sms)
        form.append(NEW_GUEST_FORM.text_whatsapp, text.whatsapp)
        vsms && form.append(NEW_GUEST_FORM.can_send_sms, 'on')
        vwhatsapp && form.append(NEW_GUEST_FORM.can_send_whatsapp, 'on')
        form.append(NEW_GUEST_FORM.sms_total, countSms.messages.toString())
        form.append(NEW_GUEST_FORM.template_id, selectedTemplate);
        form.append(NEW_GUEST_FORM.phone, dataPhone.number);
        form.append(NEW_GUEST_FORM.country_code, dataPhone.country);
        form.append(NEW_GUEST_FORM.country_call, dataPhone.countryCallingCode);

        form.has(NEW_GUEST_FORM.can_send) && DispachEventOpenGuestSocketDetail(null)

        fetchAPi('post', URLS.eventGuestsStore, form, true)
            .then(({ data }) => {
                DispachGuestsDetail(data)
                Notifier.sussess(t('Créé avec succès !'))
                // @ts-ignore
                updateTextValue({ value: selectedTemplate })
                setFields(e => ({ ...e, [NEW_GUEST_FORM.name]: '' }))
                onPhoneValueChange('')
                dispach(putEventStatus({ saved_guests: data.meta.total }))
            })
    }

    return <div className="new-guest">
        <div className="mb-4">
            <b className="text-sm">
                {t('Enregistrer invité')}.
            </b>
        </div>
        <form method="post" onSubmit={saveGuest} autoComplete="off">
            <div className="row">
                <div className="col-lg-6">
                    <InputField
                        type="text"
                        onChange={onChangeField}
                        value={fields[NEW_GUEST_FORM.name]}
                        name={NEW_GUEST_FORM.name}
                        placeholder={t("Nom de l'invité")} />
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <PhoneInput
                                value={phone}
                                className="form-control"
                                placeholder={t("Numéro de téléphone de l'invité")}
                                onChange={onPhoneValueChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-xs text-muted mt-3 mb-2">
                {t("Entrez le nombre d'invités qui seront autorisés utiliser cette invitation")}.
            </div>
            <InputField
                type="number"
                className="form-control form-control-sm"
                onChange={onChangeField}
                value={fields[NEW_GUEST_FORM.autorized]}
                name={NEW_GUEST_FORM.autorized}
                placeholder={t("Autorisés")} />
            <div className="text-xs text-muted mt-3 mb-2">
                {t("Choisissez l'un de vos modèles enregistrés comme message d'envoi, vous pouvez également le modifier à votre guise")}.
            </div>
            <select ref={templatesEl} />
            {
                selectedTemplate && (
                    <div className="my-4 d-flex">
                        <DefaultButton
                            color="secondary"
                            textColor="text-primary"
                            label={t('Modifier le text')}
                            onClick={editText}
                            disabled={disabledTextField} />
                        <DefaultButton
                            color="secondary"
                            textColor="text-primary"
                            label={t('Voir le text')}
                            onClick={viewText}
                            disabled={disabledTextField} />
                    </div>
                )
            }
            <div className="text-xs text-muted mt-3 mb-2">
                {t('Selectonner les services qui seront utilisés à l\'envoi du message')}.
            </div>
            <ServiceUse onSelect={onChangeServices} />
            <QrcodeCase />
            <div className="send---case">
                <div className="text-xs text-muted mt-3 mb-2">
                    {t("Cochez cette case si vous souhaitez enregistrer l'invité et envoyer le message en même temps")}.
                </div>
                <CustomCheckbox name={NEW_GUEST_FORM.can_send} label={t('Enregister et envoyer')} />
            </div>
            <div className="mt-4">
                <DefaultButton
                    type="submit"
                    loading={onSave}
                    disabled={disabledTextField}
                    label={t('Enregistrer')} />
                <EstimatePrice
                    phone={phone}
                    textValues={finalTextValue.current}
                    disabledTextField={disabledTextField}
                    services={services} />
            </div>
        </form>
        {!disabledTextField && <ModalConfirm
            footer={true}
            closeText={t('Fermer')}
            size="modal-md"
            confirmText={t('Enregister')}
            ref={modalRef}
            message={modalViews[indexModalView]} />}
    </div>
}


const GuestsListProvider = () => {
    const { t } = useTranslation()
    const [datas, setDatas] = useState({})

    const [showAll, setShowAll] = useState(false)

    const handleGuestList = useCallback((e) => {
        setShowAll(false)
        setDatas(e.detail)
    }, [setShowAll, setDatas])

    const { fullLoading, parentElemt, setFullLoading } = useFullLoading()

    const { fetchLoading: loading, fetchAPi, ApiRequest } = useFetch()

    useEffect(() => {
        fetchAPi('get', URLS.eventGuests)
            .then(({ data }) => setDatas(data))
        window.addEventListener(Event_Guests_Name, handleGuestList)
        return () => {
            window.removeEventListener(Event_Guests_Name, handleGuestList)
        }
    }, [])

    const showAllHandle = useCallback(({ target: { checked } }) => {
        setShowAll(checked)
        setFullLoading(true)
        ApiRequest('get', URLS.eventGuests + (checked ? '?all=true' : ''))
            .finally(() => setFullLoading(false))
            .then(({ data }) => setDatas(data))
    }, [setShowAll, setFullLoading, setDatas])

    const [sending, setSending] = useState(false)
    const [sendLoading, setSendLoading] = useState(false)

    const sendAll = useCallback(() => {
        setSending(true)
        setSendLoading(true)
        ApiRequest('post', URLS.eventGuestsSendall, {}, true)
            .finally(() => setSending(false))
            .then(({ data }) => {
                DispachEventProcessQueueDetail({
                    status: data
                })
            })
    }, [setSendLoading, setSending, DispachEventProcessQueueDetail])

    return <div ref={parentElemt}>
        {fullLoading && <FullLoader parent={parentElemt.current} />}

        <div className="row">
            <div className="col">
                <DefaultButton
                    disabled={sendLoading}
                    loading={sending}
                    textColor="text-primary"
                    onClick={sendAll} color="secondary"
                    label={t('Tout envoyer')} />
            </div>
            <div className="col-auto">
                <CustomCheckbox
                    onChange={showAllHandle}
                    checked={showAll}
                    label={t('Tout afficher')} />
            </div>
        </div>
        <div className="my-3" />
        <GuestList url={URLS.eventGuests} datas={datas} setFullLoading={setFullLoading} />
        {loading ? <SkeletonBox height="50" lines="3" /> : ''}
        {/*  @ts-ignore */}
        {!loading && datas.meta && !datas.meta.total ? (
            <div className="mt-5">
                <Empty message={t('Aucun Invité enregistré!')} />
            </div>
        ) : ''}
    </div>
}

const Guests = () => {
    return <div className="mb-9">
        <div className="row">
            <div className="col">
                <Help />
            </div>
        </div>
        <div className="row justify-content-start">
            <div className="col-lg-7">
                <RowDivider />
                <CreateNewGuest />
            </div>
            <div className="col-lg-5">
                <RowDivider />
                <GuestsListProvider />
            </div>
        </div>
    </div>
}

export default Guests