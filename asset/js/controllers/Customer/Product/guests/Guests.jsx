//@ts-check
import React, { Fragment, useEffect, useRef, useCallback, useState, memo, useMemo } from 'react'
import { useTranslation } from "react-i18next";
import Help from './Help';
import RowDivider from '@/js/react/components/RowDivider';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchEventTemplates } from '@/js/store/features/product/TemplatesSlice';
import { URLS } from '@/js/react/vars';
import { slim as slimSelect } from '@js/utils/SlimSelect'
import { InputField } from '@/js/react/components/InputField';
import { DefaultButton } from '@/js/react/components/Buttons';
import PhoneInput from '@/js/react/components/PhoneInput';
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import ModalConfirm from '@/js/react/components/ModalConfirm';
import { caseSection, caseSectionValue, KeysRequiredInText, SectionView, TEMPLATE_SECTION, TextAreatEdit, useSectionText } from '../template/Sections';
import { ApiRequest } from '@/js/api/api';

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
    sendMessage: 'can_send'
}


const CustomCheckbox = memo( /**  @param { any } props */(props) => {
    // @ts-ignore
    const { value, name = null, label = '', onChange = null, defaultChecked } = props
    const random = parseInt((Math.random() * Date.now()).toString(), 10)
    return <div className="custom-control custom-checkbox">
        <input type="checkbox"
            defaultChecked={defaultChecked}
            className="custom-control-input" name={name} onChange={onChange} id={name + random} value={value} />
        <label className="custom-control-label" htmlFor={name + random}>{label}</label>
    </div>
})

const ServiceUse = ({ onSelect }) => {
    const { t } = useTranslation();
    const [data, setData] = useState([SERVICES.sms])

    useEffect(() => {
        onSelect(data)
    }, [data])

    const onChange = useCallback(({ target }) => {
        setData(e => {
            const h = new Set([...e, target.value]);
            !target.checked && h.delete(target.value)
            return Array.from(h)
        })
    }, [setData])

    return <div className="mt-4 d-md-flex">
        <div className="mr-md-5">
            <CustomCheckbox
                onChange={onChange}
                defaultChecked
                value={SERVICES.sms}
                label={t('SMS')} />
        </div>
        <CustomCheckbox
            onChange={onChange}
            value={SERVICES.whatsapp}
            label={t('WhatsApp')} />
    </div>
}

const QrcodeCase = () => {
    const { t } = useTranslation();
    return <div className="qr---case">
        <div className="text-xs text-muted mt-3 mb-2">
            {t('Cocher cette case si vous souhaitez que le code d\'invitation en image Qr code soit inclus dans le message')}.
        </div>
        <CustomCheckbox value={NEW_GUEST_FORM.qrcode} name={NEW_GUEST_FORM.qrcode} label={t('Qr code Image')} />
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
    const [loading, setLoading] = useState(false)
    const [prices, setPrices] = useState(null)

    const onClick = useCallback(() => {
        if (disabledTextField) return
        const dataPhone = parsePhoneNumber(phone)
        // @ts-ignore
        const sms = SmsCounter.count(textValues[SERVICES.sms])
        setLoading(true)
        ApiRequest('get', `${URLS.countryPricing}?country_code=${dataPhone.country}`, {}, true)
            .then(({ data: { prices: { sms: smsPrice, whatsapp } } }) => {
                const p = ((+smsPrice) * +(sms.messages))
                setPrices({
                    // @ts-ignore
                    sms: !isNaN(p) ? p.nround(3) : null,
                    whatsapp
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }, [services, textValues, phone, disabledTextField])

    const price = (v) => v !== null && !isNaN(v) ? `${v}$` : t('Indisponible')

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
    const [phone, setPhone] = useState('')

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


    const onPhoneValueChange = useCallback((v) => {
        setPhone(v)
    }, [setPhone])

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

    /**
     * @param { React.FormEvent<HTMLFormElement> } e 
     */
    const saveGuest = (e) => {
        e.preventDefault()
        const { target } = e
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
                                name={NEW_GUEST_FORM.phone}
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
                <CustomCheckbox name={NEW_GUEST_FORM.sendMessage} label={t('Enregister et envoyer')} />
            </div>
            <div className="mt-4">
                <DefaultButton
                    type="submit"
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

const Guests = () => {
    const { t } = useTranslation();

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
                <DefaultButton textColor="text-primary" color="secondary" label={t('Tout envoyer')} />
            </div>
        </div>
    </div>
}

export default Guests